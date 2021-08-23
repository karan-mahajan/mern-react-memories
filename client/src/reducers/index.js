import { combineReducers } from "redux";
import { postsReducer } from './reducer'

export default combineReducers({ posts: postsReducer });