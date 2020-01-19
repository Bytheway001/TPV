import React, { useState } from 'react';
import { Button, Modal, ListGroup, ListGroupItem, Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';
import { API } from '../../constants';
const OrderModal = props => {
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const placeOrder = () => {
        Axios.post(API + '/tables/' + props.table.table_id + '/orders', order).then(res => res.data)
            .then(result => {
                props.getTable(props.table.table_id)
                setOrder([])
                handleClose();
                props.setNotification('success','Orden Creada')
            })
    }
    const addProduct = (productId) => {
        let newOrder = { ...order }
        if (newOrder[productId]) {
            newOrder[productId].qty++;
        }
        else {
            newOrder[productId] = { qty: 1 }
        }
        setOrder(newOrder)
    }

    const removeProduct = (productId) => {
        let newOrder = { ...order }
        if (newOrder[productId]) {
            if (newOrder[productId].qty > 0) {
                newOrder[productId].qty--;
                setOrder(newOrder)
            }
            if (newOrder[productId].qty === 0) {
                delete newOrder[productId];
                setOrder(newOrder)
            }

        }
    }
    return (
        <>
            <Button size='sm' variant="info" onClick={handleShow}>Tomar Pedido</Button>
            <Modal size='lg' show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Tomar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="Segundos" id="uncontrolled-tab-example" className='flex-row'>
                        {[...new Set(props.products.list.map(r => r.family))].map((family,key) => {
                            return (
                                <Tab key={key} tabClassName='px-2 bg-primary' eventKey={family} title={family}>
                                    <div className='py-2'>
                                    <ListGroup>
                                        {
                                            props.products.list.filter(x => x.family === family && x.active==='Y').map((product,key) => {
                                                return (
                                                    <ListGroupItem key={key} className='d-flex justify-content-between p-1'>
                                                        <span>{product.name}</span>
                                                        <span>
                                                            <Button size='sm' onClick={() => removeProduct(product.id)}>-</Button>
                                                            <span className='btn btn-secondary btn-sm'>{order[product.id] ? order[product.id].qty : 0}</span>
                                                            <Button size='sm' onClick={() => addProduct(product.id)}>+</Button>
                                                        </span>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                    </div>
                                </Tab>)

                        })}

                    </Tabs>

                  

                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Volver</Button>
                <Button variant="primary" onClick={() => placeOrder()}>Enviar Pedido</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
export default OrderModal;