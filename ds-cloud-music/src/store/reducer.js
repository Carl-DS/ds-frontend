import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as SingersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';

export default combineReducers({
  recommend: recommendReducer,
  singers: SingersReducer,
  rank: rankReducer,
});
