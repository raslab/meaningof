import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './userSlice'
import searchReducer from './searchSlice'
import thunkMiddleware from 'redux-thunk'
import postReducer from './postsSlice'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        posts: postReducer
    },
    composedEnhancer
})