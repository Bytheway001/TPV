import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import OrderModal from './tpv/OrderModal';
const Bar = props => {
    const { type } = props;
    if (type === 'pc') {
        return (
            <Navbar bg='dark' variant="dark" expand="lg">
                <Navbar.Brand href="#home">Joropo Express</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Caja</Nav.Link>
                        <Nav.Link as={Link} to="/kitchen">Cocina</Nav.Link>
                        <Nav.Link as={Link} to="/tpv">TPV</Nav.Link>
                        <NavDropdown title="Configuracion" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/reports">Reportes</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Menu del Dia</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Otros</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/hall/products">Productos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
    else if (type === 'order') {
        return (
            <Navbar bg="light" expand="lg" className='d-flex justify-content-between'>
                <Navbar.Brand as={Link} to='/tpv'>{<span className='fa fa-arrow-left' />}</Navbar.Brand>
                <Navbar.Brand href="#home">Mesa {props.tableId}</Navbar.Brand>
              
                <OrderModal setNotification={props.setNotification} products={props.products} table={props.table} getTable={props.getTable} />
            </Navbar>
        )
    }
    return (
        <Navbar bg="light" expand="lg" className='d-flex justify-content-start'>
             <Navbar.Brand as={Link} className='d-none d-md-inline' to='/'>{<span className='fa fa-arrow-left' />}</Navbar.Brand>
            <Navbar.Brand href="/tpv">Seleccionar Mesa</Navbar.Brand>
        </Navbar>
    )
}
export default Bar;

