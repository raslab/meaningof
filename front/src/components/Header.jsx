import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import store from '../store/store';
import { loadMyUser, logout } from '../store/userSlice';

export default function Header() {
    const user = useSelector(state => state.user)
    const history = useHistory()

    const isLogined = user.logined
    const userName = user.userName

    if (!isLogined) {
        store.dispatch(loadMyUser())
    }

    function makeLogout() {
        store.dispatch(logout())
            .then(() => { history.push('/login') })
    }

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
                        {isLogined && user.isAdmin && <div className="nav-link text-success">(admin)</div>}
                        <NavDropdown title={userName ? userName : "User"} alignRight id="navbarScrollingDropdown" >
                            {isLogined && <LinkContainer to='/user'><NavDropdown.Item>{userName}</NavDropdown.Item></LinkContainer>}
                            {!isLogined && <LinkContainer to="/login"><NavDropdown.Item>Login</NavDropdown.Item></LinkContainer>}
                            {isLogined && <NavDropdown.Item onClick={() => { makeLogout() }}>Logout</NavDropdown.Item>}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </Container >
    );
}