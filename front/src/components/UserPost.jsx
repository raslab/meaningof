import React from 'react'
import { Card } from 'react-bootstrap';

export default function UserPost(param) {
    return (
        <Card className="mb-4">
            <Card.Header>{param.title}</Card.Header>
            <Card.Body>
                <Card.Text>{param.content}</Card.Text>
                {param.publishTime && <small className="text-muted text-right d-block">{new Date(param.publishTime).toLocaleString()}</small>}
            </Card.Body>
        </Card>
    );
}