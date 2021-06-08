import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import store from '../store/store';
import { loadMyUser } from '../store/userSlice';

export default function GrabUserData() {

    const userUpdating = useSelector(state => state.user.updating)
    const history = useHistory()

    if (!userUpdating) {
        store.dispatch(loadMyUser())
            .then(() => { history.push('/user') })
    }

    return (
        <p>Loading...</p>
    );
}