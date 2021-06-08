import { createSlice } from '@reduxjs/toolkit'
import config from '../config'

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
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        }
        await fetch(config.API_URL + '/latest', init)
            .then(response => response.json())
            .then(json => {
                dispatch(onLoaded({ searchQuery: 'latest tag', results: json.posts }))
            });
    }
}

export function startSearch(query) {
    if (!query) {
        return loadLatest()
    } else if (query.length < 3) {
        return () => { }
    }

    return async function (dispatch, getState) {
        const init = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include'
        }
        const url = new URL(config.API_URL + '/search?') + new URLSearchParams({ q: query })
        await fetch(url, init)
            .then(response => response.json())
            .then(json => {
                dispatch(onLoaded({ searchQuery: query, results: json.posts }))
            });
    }
}

export const { startLoading, onLoaded } = searchSlice.actions

export default searchSlice.reducer