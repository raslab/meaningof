import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchQuery: null,
        isLoading: false,
        results: null
    },
    reducers: {
        startLoading: (state, action) => {
            return {
                searchQuery: action.payload.searchQuery,
                isLoading: true,
                results: null
            }
        },
        onLoaded: (state, action) => {
            return {
                searchQuery: action.payload.searchQuery,
                isLoading: false,
                results: action.payload.results
            }
        }
    }
})


export function loadLatest() {
    return async function (dispatch, getState) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const pp = getState().posts?.posts
        if (pp) {
            dispatch(onLoaded({
                searchQuery: 'latest',
                results: pp.slice(0, 10)
            }))
        }

    }
}

export function startSearch(query) {
    return async function (dispatch, getState) {
        dispatch(startLoading({ searchQuery: query }))
        await new Promise(resolve => setTimeout(resolve, 300))
        const q = query.toLowerCase()
        const pp = getState().posts?.posts
        if (!pp || !q) {
        }
        else {
            dispatch(onLoaded({
                searchQuery: query,
                results: pp.filter(p => p.title.toLowerCase().indexOf(q) > -1)
            }))
        }
    }
}

export const { startLoading, onLoaded } = searchSlice.actions

export default searchSlice.reducer