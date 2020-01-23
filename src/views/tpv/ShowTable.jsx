import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col,  Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTable } from '../../ducks/tpv';
import Axios from 'axios';
import { API } from '../../constants';
const ShowTable = props => {
   
    const [products, setProducts] = useState([]);
    useEffect(() => {

        props.getTable(props.match.params.id)
        //eslint-disable-next-line 
    }, [])
    useEffect(() => {
        Axios.get(API + '/products').then(res => res.data)
            .then(result => setProducts(result.data))
        //eslint-disable-next-line 
    }, [])

    const findProductName=(productId)=>{
        if(products.length>0){
           
            return products.find(x=>x.id===productId).name
        }
       
    }
    const findProductType=(productId)=>{
        if(products.length>0){
     
            return products.find(x=>x.id===productId).family==='Completos'?'Completo':'Solo'
        }
    }


    return (
        <Fragment>
           
            <Container style={{ paddingTop: 15 }}>
                <Row>
                    <Col xs={12}>
                        <h3 className="text-center">Orden Actual</h3>
                        {
                            props.table && props.table.current_order ?
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Subtotal</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            props.table.current_order.order_products.map(p => {
                                                return (
                                                    <tr>
                                                        <td>{findProductName(p.product_id)+' ('+findProductType(p.product_id)+')'}</td>
                                                        <td>{p.qty}</td>
                                                        <td>{p.unit_price}</td>
                                                        <td>{p.qty*p.unit_price}</td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </Table>

                                :
                                <p className='text-center'>No hay Orden Abierta para esta mesa</p>
                        }
                    </Col>
                </Row>
            </Container>
        </Fragment >
    )
}


const mapStateToProps = state => {
  return{
    table: state.tpv.active,
  }
}
const mapDispatchToProps = dispatch => {
    return {
        getTable: (id) => dispatch(getTable(id)) // data:{table_id, current_order}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowTable)