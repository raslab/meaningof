import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton, TelegramLoginButton } from "react-social-login-buttons";
import { loginTo } from '../store/userSlice';
import store from '../store/store';


export default function Login() {
    let { service } = useParams();
    const history = useHistory();


    function redirectTo(servise) {
        history.push("/login/" + servise);
    }

    if (service) {
        store.dispatch(loginTo(service))
            .then(() => {
                history.push("/")
            })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg="5">

                    {service
                        ? <h3> {service} </h3>
                        : <>
                            <h3>Login</h3> <br />
                            <GoogleLoginButton onClick={() => { redirectTo('google') }} />
                            <FacebookLoginButton onClick={() => { redirectTo('facebook') }} />
                            <TelegramLoginButton onClick={() => { redirectTo('telegram') }} />
                        </>}

                </Col>
            </Row>
        </Container>
    );
}