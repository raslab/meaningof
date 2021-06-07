import { createSlice } from '@reduxjs/toolkit'

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
        await new Promise(resolve => setTimeout(resolve, 300))
        dispatch(postsLoaded({
            posts: [{
                id: getState.posts.posts.length + 1,
                publisher: '1234',
                date: new Date().toLocaleDateString(),
                title: 'my meaning',
                content: 'some explanation'
            }
            ]
        }))
    }
}

export function addMyPost(post) {
    return async function (dispatch, getState) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const state = getState()
        if (!state.user.logined) return
        dispatch(postsLoaded({
            posts: [{
                id: state.posts.posts.length + 1,
                publisher: state.user.userId,
                date: new Date().toLocaleDateString(),
                title: post.title,
                content: post.content
            }]
        }))
    }
}

export const { postsLoaded } = postsSlice.actions

export default postsSlice.reducer