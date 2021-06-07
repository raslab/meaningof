import { createSlice } from '@reduxjs/toolkit'

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
                userId: action.payload.userId,
                userName: action.payload.userName,
                logined: true
            }
        },
        logout: (state) => {
            return {
                userId: null,
                userName: null,
                logined: false
            }
        }
    },
})

export function loginTo(service) {
    return async function (dispatch, getState) {
        await new Promise(resolve => setTimeout(resolve, 300))
        dispatch(onLogin({
            userId: '12345',
            userName: 'temp user'
        }))
        console.log(getState())
    }
}

export const { onLogin, logout } = userSlice.actions

export default userSlice.reducer