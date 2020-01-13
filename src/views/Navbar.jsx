import React from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'
const Bar = props => {
    return (
        <Navbar bg='dark' variant="dark" expand="lg" className={!props.shown?'d-none':'d-flex'}>
            <Navbar.Brand href="#home">Joropo Express</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Caja</Nav.Link>
                    <Nav.Link  as={Link} to="/tpv">TPV</Nav.Link>
                    <NavDropdown title="Configuracion" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Reportes</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Menu del Dia</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Otros</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Bar;