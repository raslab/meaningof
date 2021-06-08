import React from 'react'
import { useSelector } from 'react-redux';
import { deletePost } from '../store/postsSlice';
import UserPost from './UserPost';
import store from '../store/store';

export default function User() {
    const userName = useSelector(state => state.user.userName)
    const userId = useSelector(state => state.user.userId)
    const posts = useSelector(state => state.posts.posts).filter(p => p.publisher === userId)

    return (
        <>
            <br />
            <h2>{userName}</h2>
            <br />
            <p>Published posts: {posts.length}</p>
            <p>Posts:</p>
            {posts.map(p =>
                <UserPost
                    {...p}
                    key={p.id}
                    onDeleteClick={() => { store.dispatch(deletePost(p.id)) }}
                />
            )}
        </>
    );
}