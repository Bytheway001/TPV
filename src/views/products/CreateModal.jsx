import React, { useState, Fragment } from 'react';
import { Button, Modal, Form, FormGroup, FormControl } from 'react-bootstrap';
export const CreateModal = props => {
    const [show, setShow] = useState(false);
    const [name,setName]=useState('')
    const [family,setFamily]=useState('')
    const [price,setPrice]=useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = ()=>{
        let product={name,family,price}
        props.handleSubmit(product)
        handleClose()
    }

    return (
        <Fragment>
            <Button className='mb-3' variant="primary" onClick={handleShow}>Crear Producto</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <label>Nombre:</label>
                            <FormControl value={name} size='sm' onChange={({target})=>setName(target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Familia:</label>
                            <FormControl value={family} size='sm' onChange={({target})=>setFamily(target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Precio:</label>
                            <FormControl value={price} type='number' onChange={({target})=>setPrice(target.value)} size='sm'/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleSubmit}>Crear!</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
