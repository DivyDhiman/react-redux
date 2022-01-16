import { combineReducers } from "redux";
import postListReducer from "./post_list_reducer";
import postDetailReducer from "./post_detail_reducer";
import postCommentsReducer from "./post_comments_reducer";

const rootReducer = combineReducers({
    postListReducer,
    postDetailReducer,
    postCommentsReducer
});

export default rootReducer;
