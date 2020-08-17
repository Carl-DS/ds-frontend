import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
import { reducer as SingersReducer } from "../application/Singers/store/index";
import { reducer as rankReducer } from "../application/Rank/store/index";
import { reducer as albumReducer } from "../application/Album/store/index";
import { reducer as singerInfoReducer } from "../application/Singer/store/index";
import { reducer as playerReducer } from "../application/Player/store/index";
import { reducer as searchReducer } from "../application/Search/store/index";

export default combineReducers({
  recommend: recommendReducer,
  singers: SingersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
  search: searchReducer,
});
