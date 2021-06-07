import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AddPost from './AddPost';
import Header from './Header';
import Login from './Login';
import Search from './Search';
import User from './User';

export default function App() {
    const logined = useSelector(state => state.user.logined)

    return (
        <Router>
            <Header />
            <Container className="p-3">
                <Switch>

                    <Route
                        path="/add"
                        render={({ location }) =>
                            logined ? (
                                <AddPost />
                            ) : (
                                <Redirect to={{ pathname: "/", state: { from: location } }} />
                            )
                        }
                    />
                    <Route
                        path="/user"
                        render={({ location }) =>
                            logined ? (
                                <User />
                            ) : (
                                <Redirect to={{ pathname: "/", state: { from: location } }} />
                            )
                        }
                    />

                    <Route
                        path="/login/:service"
                        children={<Login />}
                    />
                    <Route
                        path="/login"
                        children={<Login />}
                    />

                    <Route path="/">
                        <Search />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}