import React, { useState } from 'react'
import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { BiSearchAlt2 } from 'react-icons/bi'

export default function SearchBar(params) {

    const [query, setQuery] = useState('')

    function HandleSearchClick(e) {
        setQuery(e.target.value);
        if (params.onChange) {
            params.onChange(e.target.value)
        }
    }

    return (
        <Container className={params.className}>
            <Row className="justify-content-center">
                <Col lg="9">
                    <Form onSubmit={e => { e.preventDefault() }}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="main-search"><BiSearchAlt2 /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search meanings of life"
                                aria-label="searchQuery"
                                aria-describedby="main-search"
                                onChange={HandleSearchClick}
                                value={query}
                            />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
}