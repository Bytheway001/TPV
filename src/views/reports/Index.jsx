import React,{useEffect} from 'react';
import { Card, Table } from 'react-bootstrap';

export const ReportsIndex = props=>{
    useEffect(() => {
        props.getDayBalance()
        //eslint-disable-next-line 
    }, [])
    const s=[];
   props.balance.map((op,index)=>{
        if(index>0){
            return s.push((op.qty*op.price)+s[index-1])
        }
        else{
            return s.push(op.qty*op.price)
        }
    })
    
    return(
        <Card>
            <Card.Header>Balance del dia</Card.Header>
            <Card.Body>
                <Table>
                    <thead>
                    <th>Concepto</th>
                    <th>Cantidad</th>
                    <th>Movimiento</th>
                    <th>Saldo</th>
                    </thead>
                    <tbody>
                        {
                            props.balance.map((op,index)=>{
                                return(
                                    <tr>
                                        <td>{op.product}</td>
                                        <td>{op.qty}</td>
                                        <td>{op.qty*op.price}</td>
                                        <td>{s[index]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                
            </Card.Body>
        </Card>
    )
}