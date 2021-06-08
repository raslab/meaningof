import { createSlice } from '@reduxjs/toolkit'
import config from '../config'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: []
    },
    reducers: {
        postsLoaded: (state, action) => {
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts]
            }
        },
        onPostDeleted: (state, action) => {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload.postId)
            }
        }
    },
})

export function loadMyPosts() {
    return async function (dispatch, getState) {
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };
        await fetch(config.API_URL + '/userPost', init)
            .then(response => response.json())
            .then(json => {
                dispatch(postsLoaded(json))
            });
    }

}

export function addMyPost(post) {
    return async function (dispatch, getState) {
        const init = {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'include',
            body: JSON.stringify({
                title: post.title,
                content: post.content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await fetch(config.API_URL + '/userPost', init)
            .then(response => response.json())
            .then(json => {
                dispatch(postsLoaded(json))
            });
    }
}

export function deletePost(postId) {
    return async function (dispatch, getState) {
        const init = {
            method: 'DELETE',
            cache: 'no-cache',
            credentials: 'include'
        };
        await fetch(config.API_URL + '/userPost/' + postId, init)
            .then(response => response.json())
            .then(json => {
                dispatch(onPostDeleted({ postId: postId }))
            });
    }
}

export const { postsLoaded, onPostDeleted } = postsSlice.actions

export default postsSlice.reducer