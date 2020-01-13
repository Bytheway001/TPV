import React, { useState } from 'react';
import { Button, Modal, ListGroup,ListGroupItem } from 'react-bootstrap';
import Axios from 'axios';
import { API } from '../../constants';
const OrderModal = props => {
    const [show, setShow] = useState(false);
   
    const [order,setOrder]=useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   

    const placeOrder=()=>{
        Axios.post(API+'/tables/'+props.table.table_id+'/orders',order).then(res=>res.data)
        .then(result=>{
            props.getTable(props.table.table_id)
            setOrder([])
            handleClose();
            
        })
    }
    const addProduct = (productId)=>{
        let newOrder={...order}
        if(newOrder[productId]){
            newOrder[productId].qty++;
        }
        else{
            newOrder[productId]={qty:1}
        }
       setOrder(newOrder)
    }

    const removeProduct = (productId)=>{
        let newOrder={...order}
        if(newOrder[productId]){
            if(newOrder[productId].qty>0){
                newOrder[productId].qty--;
                setOrder(newOrder)
            }
            if(newOrder[productId].qty===0){
                delete newOrder[productId];
                setOrder(newOrder)
            }

        }
    }
    return (
        <>
            <Button size='sm' variant="info" onClick={handleShow}>Tomar Pedido</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tomar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                    {
                        props.products.map(product=>{
                            return (
                                <ListGroupItem className='d-flex justify-content-between'>
                                    <span>{product.name}</span>
                                    <span>
                                        <Button onClick={()=>removeProduct(product.id)}>-</Button>
                                        <span className='btn btn-secondary'>{order[product.id]?order[product.id].qty:0}</span>
                                        <Button onClick={()=>addProduct(product.id)}>+</Button>
                                        </span>
                                </ListGroupItem>
                            )
                        })
                    }
                    </ListGroup>
                  
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Volver</Button>
                    <Button variant="primary" onClick={()=>placeOrder()}>Enviar Pedido</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default OrderModal;