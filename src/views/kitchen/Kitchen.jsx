import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Axios from 'axios';
import { API } from '../../constants';

const Kitchen = props => {
    const [orders, setOrders] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getOrderList()
        setTimeout(() => getOrderList(), 10000)
        //eslint-disable-next-line 
    }, [])

    useEffect(() => {
        Axios.get(API + '/products').then(res => res.data)
            .then(result => setProducts(result.data))
        //eslint-disable-next-line 
    }, [])

    const getOrderList = () => {
        Axios.get(API + '/orders').then(res => res.data)
            .then(result => {
                setOrders(result.data);
            })
    }

    const findProductName = (productId) => {
        if (products.length > 0) {
            console.log(productId, products)
            return products.find(x => x.id === productId).name
        }

    }

    const Deliver = orderId => {
        if (window.confirm('Desea entegar esta orden'))
            Axios.post(API + '/orders/' + orderId + '/deliver').then(res => res.data)
                .then(result => {
                    getOrderList()
                })
    }

    const getTotalOrders = () => {
        if (orders) {
            let totalOrders = {}
            orders.forEach((order) => {
                if(order.status==='open'){
                    order.order_products.forEach(op => {
                        let productName = findProductName(op.product_id)
                        if (totalOrders[productName]) {
                            totalOrders[productName]=totalOrders[productName]+op.qty
                        }
                        else {
                            totalOrders[productName] = op.qty;
                        }
                    })
                }
            })
            return totalOrders

        }
        else return {}
    }
    return (
        <Container fluid className='w-100 px-0' >
            <Row noGutters>
                <Col sm={9}>
                    <Card>
                        <Card.Header>Ordenes</Card.Header>
                        <Card.Body>

                            <Row>
                                {orders && orders.map(order => {
                                    let bg = order.status === 'open' ? 'bg-success' : order.status === 'warning' ? 'bg-warning' : 'bg-danger'
                                    return (
                                        <Col sm={4} className='my-4'>
                                            <Card border="primary" style={{ minHeight: 200 }}>
                                                <Card.Header className={bg + ' d-flex justify-content-between'}>
                                                    <span>#{order.id}</span>
                                                    <Button disabled={order.status !== 'open'} onClick={() => Deliver(order.id)} size='sm' variant='info'>Entregar</Button>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Table size='sm' variant='bordered'>
                                                        <tbody>
                                                            {order.order_products.map(op => {
                                                                return (
                                                                    <tr>
                                                                        <td>{op.qty}</td>
                                                                        <td>{findProductName(op.product_id)}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })

                                }
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card id='totalpedidos'>
                        <Card.Header>Total Pedidos:</Card.Header>
                        <ListGroup>
                            {
                                Object.keys(getTotalOrders()).map(order => {
                                    return (

                                        <ListGroupItem className='py-1 px-2 d-flex justify-content-between'><span>{order}</span><span>{getTotalOrders()[order]}</span></ListGroupItem>

                                    )
                                })
                            }
                        </ListGroup>
                    </Card>

        </Container>
    )
}

export default Kitchen;