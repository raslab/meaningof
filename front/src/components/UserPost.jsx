import React from 'react'
import { Card } from 'react-bootstrap';

export default function UserPost(param) {
    return (
        <Card className="mb-4">
            <Card.Header>{param.title}</Card.Header>
            <Card.Body>
                <Card.Text>{param.content}</Card.Text>
                {!param.simple && <small className="text-muted text-right d-block">{param.date}</small>}
            </Card.Body>
        </Card>
    );
}