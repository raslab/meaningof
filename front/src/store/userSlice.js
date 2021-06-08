import { createSlice } from '@reduxjs/toolkit'
import config from '../config'
import { loadMyPosts } from './postsSlice'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: '',
        userName: null,
        logined: false
    },
    reducers: {
        onLogin: (state, action) => {
            return {
                ...state,
                ...action.payload,
                logined: true
            }
        },
        setUpdating: (state, action) => {
            return {
                ...state,
                updating: action.payload.updating
            }
        },
        onLogout: (state) => {
            return {
                ...state,
                userId: null,
                userName: null,
                logined: false
            }
        }
    },
})

export function loadMyUser() {
    return async function (dispatch, getState) {
        if (getState().user.updating === true) {
            return
        }
        dispatch(setUpdating({ updating: true }))
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };
        await fetch(config.API_URL + '/user', init)
            .then((response) => {
                return response.json();
            })
            .then(json => {
                if (json.status === 200) {
                    dispatch(onLogin(json.user))
                    dispatch(loadMyPosts())
                }
            })
            .then(() => {
                dispatch(setUpdating({ updating: false }))
            });
    }
}

export function logout() {
    return async function (dispatch, getState) {
        if (getState().user.updating === true) {
            return
        }
        dispatch(setUpdating({ updating: true }))
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        };
        await fetch(config.API_URL + '/user/logout', init)
            .then((response) => {
                if (response.status === 200)
                    dispatch(onLogout())
            })
            .then(() => {
                dispatch(setUpdating({ updating: false }))
            });
    }
}

export const { onLogin, onLogout, setUpdating } = userSlice.actions

export default userSlice.reducer