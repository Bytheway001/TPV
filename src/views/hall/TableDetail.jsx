import React,{useEffect,useState} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { CloseOrderModal } from './closeOrderModal';
import Axios from 'axios';
import { API } from '../../constants';

const TableDetail = props => {
    const [products,setProducts]=useState([])
    const getTotalOrder = () => {
        let total = 0;
        if (props.table.current_order) {
            props.table.current_order.order_products.map(x => {
                total = total + (x.qty * x.unit_price);
                return null
            })
        }
        return total;
    }
    useEffect(() => {
        Axios.get(API + '/products').then(res => res.data)
            .then(result => setProducts(result.data))
        //eslint-disable-next-line 
    }, [])

    const findProductName=(productId)=>{
        if(products.length>0){
            console.log(productId,products)
            return products.find(x=>x.id===productId).name
        }
       
    }

    const findProductType=(productId)=>{
        if(products.length>0){
            console.log(productId,products)
            return products.find(x=>x.id===productId).family==='Completos'?'Completo':'Solo'
        }
    }
    return (
        <div className='table-details'>
            <Row noGutters>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                              <h3 className="text-center">MESA NUMERO {props.table.table_id}</h3>
                             {props.table.current_order && <p className="text-center">Orden # {props.table.current_order.id}</p> } 
                              </Card.Header>

                        <Card.Body>
                            <Table size='sm'>
                                <thead>
                                    <tr>
                                        <th>Descripcion</th>
                                        
                                        <th>Cantidad</th>
                                        <th>P. Unitario</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.table.current_order && props.table.current_order.order_products.map(p => {
                                        
                                        return (
                                            <tr>
                                                <td>{findProductName(p.product_id)+' ('+findProductType(p.product_id)+')'}</td>
                                                <td>{p.qty}</td>
                                                <td>{p.unit_price}</td>
                                                <td>{p.qty * p.unit_price}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>

                        {
                            props.table.current_order && props.table.current_order.status === 'open' ?
                                <Card.Footer className='d-flex justify-content-between'>
                                    <span> Total a cobrar: {getTotalOrder()}</span>
                                    <CloseOrderModal table={props.table} total={getTotalOrder()} closeTable={props.closeTable}/>
                                </Card.Footer>
                                : null
                        }


                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default TableDetail;