import React, { Fragment, useState } from 'react'
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'
export const CloseOrderModal = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(props)
        props.closeTable(props.table.table_id);
        handleClose();
    }
    return (
        <Fragment>
            <Button variant="primary" onClick={handleShow}>
                Cerrar Orden
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cerrar Mesa #{props.table.table_id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Total a Cancelar: {props.total} </p>

                        <FormGroup>

                        </FormGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Button variant="primary" type='submit'>Aceptar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </Fragment>
    );
}   
