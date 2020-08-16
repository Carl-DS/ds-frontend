import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Scroll from "../../../baseUI/scroll/index";
import {
  PlayListWrapper,
  ListHeader,
  ListContent,
  ScrollWrapper,
} from "./style";
import { connect } from "react-redux";
import {
  changeShowPlayList,
  changePlayMode,
  deleteSong,
  changeSequecePlayList,
} from "../store/actions";
import { getName, shuffle, findIndex } from "../../../api/utils";
import {
  changeCurrentSong,
  changeCurrentIndex,
  changePlayList,
  changePlayingState,
} from "./../store/actions";
import { playMode } from "./../../../api/config";
import { prefixStyle } from "./../../../api/utils";
import Confirm from "./../../../baseUI/confirm/index";
import { useCallback } from "react";

function PlayList(props) {
  const [isShow, setIsShow] = useState(false);
  const [canTouch, setCanTouch] = useState(true);
  const [startY, setStartY] = useState(0);
  const [initialed, setInitialed] = useState(0);
  const [distance, setDistance] = useState(0);

  const transform = prefixStyle("transform");

  const listContentRef = useRef();
  const listWrapperRef = useRef();
  const playListRef = useRef();
  const confirmRef = useRef();

  const {
    currentIndex,
    currentSong: immutableCurrentSong,
    showPlayList,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
  } = props;

  const { clearPreSong } = props; //清空PreSong

  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    deleteSongDispatch,
    clearDispatch,
  } = props;

  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();

  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }
    changeModeDispatch(newMode);
  };

  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return;
    changeCurrentIndexDispatch(index);
  };

  const handleScroll = (pos) => {
    // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
    let state = pos.y === 0;
    setCanTouch(state);
  };

  const handleTouchStart = (e) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current.style["transition"] = "";
    setDistance(0);
    setStartY(e.nativeEvent.touches[0].pageY);
    setInitialed(true);
  };

  const handleTouchMove = (e) => {
    if (!canTouch || !initialed) return;
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance);
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
  };

  const handleTouchEnd = (e) => {
    setInitialed(false);
    if (distance >= 150) {
      togglePlayListDispatch(false);
    } else {
      listWrapperRef.current.style["transition"] = "all 0.3s";
      listWrapperRef.current.style[transform] = `translate3d(0px, 0px, 0px)`;
    }
  };

  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    deleteSongDispatch(song);
  };

  const handleShowClear = () => {
    confirmRef.current.show();
  };

  const handleConfirmClear = () => {
    clearDispatch();
    // 修复清空播放列表后点击同样的歌曲，播放器不出现的bug
    clearPreSong();
  };

  const getFavoriteIcon = (item) => {
    return <i className="iconfont">&#xe601;</i>;
  };

  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id;
    const className = current ? "icon-play" : "";
    const content = current ? "&#xe6e3;" : "";
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={(e) => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={(e) => changeMode(e)}>
          {text}
        </span>
      </div>
    );
  };

  const onEnterCB = useCallback(() => {
    setIsShow(true);
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);

  const onExitCB = useCallback(() => {
    listWrapperRef.current.style[
      transform
    ] = `translate3d(0, ${distance}px, 0)`;
  }, [distance, transform]);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExit={onExitCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => togglePlayListDispatch(false)}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={(pos) => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {playList.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">{getFavoriteIcon(item)}</span>
                      <span
                        className="delete"
                        onClick={(e) => handleDeleteSong(e, item)}
                      >
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否删除全部?"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
          handleConfirm={handleConfirmClear}
        ></Confirm>
      </PlayListWrapper>
    </CSSTransition>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  currentIndex: state.getIn(["player", "currentIndex"]),
  currentSong: state.getIn(["player", "currentSong"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"]),// 顺序排列时的播放列表
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data));
    },
    // 修改当前歌曲在列表中的 index,也就是切歌
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data));
    },
    // 修改当前的播放模式
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    // 修改当前的歌曲列表
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    },
    deleteSongDispatch(data) {
      dispatch(deleteSong(data));
    },
    clearDispatch() {
      // 1.清空两个列表
      dispatch(changePlayList([]));
      dispatch(changeSequecePlayList([]));
      // 2. 初始化 currentIndex
      dispatch(changeCurrentIndex(-1));
      // 3. 关闭 PlayList的显示
      dispatch(changeShowPlayList(false));
      // 4. 将当前歌曲置空
      dispatch(changeCurrentSong({}));
      // 5. 重置播放状态
      dispatch(changePlayingState(false));
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList));
