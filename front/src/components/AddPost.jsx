import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { addMyPost } from '../store/postsSlice';
import store from '../store/store';

export default function AddPost() {
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        const post = {
            title: e.target.title.value,
            content: e.target.content.value
        }
        store.dispatch(addMyPost(post))
            .then(() => { history.push('/user') })
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Small description</Form.Label>
                    <Form.Control type="text" placeholder="Title" name="title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Details of mening</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Write some detailed description here..." name="content" />
                </Form.Group>
                <Button type="submit">Publish</Button>
            </Form>
        </>
    );
}