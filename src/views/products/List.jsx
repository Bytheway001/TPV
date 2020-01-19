import React, { useEffect, Fragment } from 'react'
import {  Table, Button, Tabs, Tab } from 'react-bootstrap'
import { CreateModal } from './CreateModal'

export const ProductsList = props => {
    useEffect(() => {
        props.getProductList()
        //eslint-disable-next-line 
    }, [])
    return (
        <Fragment>
            <CreateModal handleSubmit={props.createProduct} />
            
            <Tabs defaultActiveKey="Segundos" id="uncontrolled-tab-example">
                {[...new Set(props.products.list.map(r => r.family))].map(family => {
                    return (
                        <Tab eventKey={family} title={family}>
                            <Table variant='striped' size='sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Familia</th>
                                        <th>Precio Base</th>
                                        <th>Act/Desact.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.products.list.filter(x => x.family === family).map(product => {
                                            return (
                                                <tr>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.family}</td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => props.toggleProduct(product.id)}
                                                            size='xs' variant={product.active === 'Y' ? "danger" : 'success'}>
                                                            {product.active === 'Y' ? "Desactivar" : 'Activar'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Tab>
                    )
                })}



            </Tabs>
        </Fragment>
    )
}