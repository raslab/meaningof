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
                posts: [...state.posts, ...action.payload.posts]
            }
        }
    },
})

export function loadMyPosts() {
    return async function (dispatch, getState) {
        console.log('get');
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };
        await fetch(config.API_URL + '/userPost', init)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                dispatch(postsLoaded(json))
            });
    }

}

export function loadUserPosts(userId) {
    return async function (dispatch, getState) {
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };
        await fetch(config.API_URL + '/userPost/' + userId, init)
            .then(response => response.json())
            .then(json => {
                console.log(json);
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
                console.log(json);
                dispatch(postsLoaded(json))
            });
    }
}

export const { postsLoaded } = postsSlice.actions

export default postsSlice.reducer