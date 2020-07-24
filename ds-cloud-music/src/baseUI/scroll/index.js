import React, {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";
import Loading from "../loading/index";
import LoadingV2 from "../loading-v2/index";
import { debounce } from "../../api/utils";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

/**
 * scroll 作为一个通用组件，在业务中会被经常取到原生 DOM 对象，而函数式组件天生不具备被上层组件
 * 直接调用 ref 的条件，因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹
 */
const Scroll = forwardRef((props, ref) => {
  // 编写组件内容
  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState();
  // current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef();
  // 从外面接受 props，解构赋值拿到这些参数
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    // 创建 better-scroll
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });

    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);

  // 每次重新渲染都要刷新实例，防止无法滑动:
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 给实例绑定 scroll 事件，
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);

  // 进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;

    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };

    bScroll.on("scrollEnd", handlePullUp);
    // 解绑
    return () => {
      bScroll.off("scrollEnd", handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  // 一般和 forwardRef 一起使用，ref 已经在 forwardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴雷 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]), // 滚动的方向
  click: true, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
};

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

export default Scroll;
