import React from 'react'
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md'

export default function UserPost(param) {
    return (
        <Card className="mb-4">
            <Card.Header className='d-flex'>
                {param.title}
                {param.onDeleteClick && <MdDelete
                    size='1.5em'
                    className='ml-auto'
                    onClick={() => {
                        param.onDeleteClick()
                    }} />}
            </Card.Header>
            <Card.Body>
                <Card.Text>{param.content}</Card.Text>
                {param.publishTime && <small className="text-muted text-right d-block">{new Date(param.publishTime).toLocaleString()}</small>}
            </Card.Body>
        </Card>
    );
}