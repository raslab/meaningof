import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deletePost } from '../store/postsSlice';
import { loadLatest, startSearch } from '../store/searchSlice';
import store from '../store/store';
import SearchBar from './SearchBar'
import UserPost from './UserPost';

export default function Search() {
    const searchQuery = useSelector(state => state.search.searchQuery)
    const results = useSelector(state => state.search.results)
    const isLoading = useSelector(state => state.search.isLoading)
    const isAdmin = useSelector(state => state.user.isAdmin)

    if ((!results || results.length === 0) && !isLoading) {
        store.dispatch(loadLatest())
    }

    function changeSearch(text) {
        store.dispatch(startSearch(text))
    }

    return (
        <Container className="mt-5">
            <SearchBar onChange={changeSearch} />

            <br />
            <Container>
                <Row className="justify-content-center">
                    <Col lg="9">
                        {
                            isLoading
                                ? <p>Loading...</p>
                                : (searchQuery && <p>Results for search '{searchQuery}':</p>)
                        }

                        {results && results.map(p =>
                            <UserPost
                                {...p}
                                key={p.id}
                                onDeleteClick={isAdmin ? () => { store.dispatch(deletePost(p.id)) } : false}
                            />
                        )}
                    </Col>
                </Row>
            </Container >
        </Container >
    );
}