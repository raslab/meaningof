import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import config from '../config'

export default function Login() {
    function redirectTo(servise) {
        window.location.href = config.API_URL + "/auth/" + servise
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg="5">

                    <h3>Login</h3> <br />
                    <GoogleLoginButton onClick={() => { redirectTo('google') }} />
                    <FacebookLoginButton onClick={() => { redirectTo('facebook') }} />

                </Col>
            </Row>
        </Container>
    );
}