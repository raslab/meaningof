import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
    const isLogined = useSelector(state => state.user.logined)
    const userName = useSelector(state => state.user.userName)

    return (
        <Container>
            <Navbar bg="light" expand="lg">

                <LinkContainer to='/'><Navbar.Brand>MeaningOf</Navbar.Brand></LinkContainer>

                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse>
                    <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                        {isLogined && <LinkContainer to='/add'><Nav.Link>Add</Nav.Link></LinkContainer>}
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                    <Nav>
                        <NavDropdown title={userName ? userName : "User"} alignRight id="navbarScrollingDropdown">
                            {isLogined && <LinkContainer to='/user'><NavDropdown.Item>{userName}</NavDropdown.Item></LinkContainer>}
                            {!isLogined && <LinkContainer to="/login"><NavDropdown.Item>Login</NavDropdown.Item></LinkContainer>}
                            {isLogined && <LinkContainer to="/logout"><NavDropdown.Item>Logout</NavDropdown.Item></LinkContainer>}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </Container>
    );
}