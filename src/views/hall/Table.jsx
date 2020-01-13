import React from 'react';
import {Button} from 'react-bootstrap';
const Table = props => {
    return (
        <Button variant={props.status==='closed'?'success':'danger'} onClick={()=>props.onSwitch(props.table.table_id)} style={{width:'25%',height:100}} className='d-flex justify-content-center my-2 mx-2'>
           {props.table.table_id}
        </Button>

    )
}
export default Table