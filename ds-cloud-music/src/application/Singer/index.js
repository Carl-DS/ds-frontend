import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { getSingerInfo, changeEnterLoading } from "./store/actions";
import { CSSTransition } from "react-transition-group";
import { Container } from "./style";
import { ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import SongsList from "../SongsList";
import { HEADER_HEIGHT } from "./../../api/config";
import Loading from "./../../baseUI/loading/index";
import MusicNote from "../../baseUI/music-note/index";

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const { artist: immutableArtist, songs: immutableSongs, loading, songsCount } = props;
  const { getSingerDataDispatch } = props;
  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
  }, []);

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  /**
   * 图片初始高度
   */
  const initialHeight = useRef(0);

  /**
   * 往上偏移的尺寸，露出圆角
   */
  const OFFSET = 5;

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  /**
   * 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM 其实是起一个遮罩的作用，
   * 给歌单内容提供白色背景 因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
   *
   * handleScroll 作为一个传给子组件的方法，我们需要用 useCallback 进行包裹，防止不必要的重渲染
   * @param {*} pos
   */
  const handleScroll = useCallback((pos) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);
    // 滑动主要分三种情况:
    // 1. 处理往下拉的情况，效果：图片放大，按钮跟着偏移
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    }

    // 2. 往上滑动，但是遮罩还没超过 Header 部分
    else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    }

    // 3. 往上滑动，但是遮罩超过 Header 部分
    else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const musicNoteRef = useRef();

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container play={songsCount}>
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        {loading ? <Loading></Loading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  artist: state.getIn(["singerInfo", "artist"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
  loading: state.getIn(["singerInfo", "loading"]),
  songsCount: state.getIn (['player', 'playList']).size,// 尽量减少 toJS 操作，直接取 size 属性就代表了 list 的长度
});

// 映射 dispatch到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
    },
  };
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
