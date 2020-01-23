import React from 'react';
import {Button} from 'react-bootstrap';
const Mesa = props => {
    return (
        <Button variant={props.status==='closed'?'outline-success':props.status==='delivered'?'outline-warning':'outline-danger'} onClick={()=>props.onSwitch(props.table.table_id)} style={{width:'25%',height:100}} className='mesa my-2 mx-2'>
           {props.table.table_id}
        </Button>

    )
}
export default Mesa