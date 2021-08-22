import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [{
    creator: '',
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
}], action) => {
    console.log("action-first", action);
    console.log("post", posts);
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload._id);
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL: {
            console.log("action", action.payload, "posts", posts)
            return action.payload;
        }
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }
}