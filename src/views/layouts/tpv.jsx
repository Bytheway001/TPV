import React, { Fragment,useEffect } from 'react';

import Bar from '../Navbar';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { clearNotification, setNotification } from '../../ducks/main';
import { getTable } from '../../ducks/tpv';
import { getProductList } from '../../ducks/products';

const TpvLayout = props => {
    useEffect(() => {
        props.getProductList()
        //eslint-disable-next-line 
    }, [])

        return (
            <Fragment>
                {!props.location?  <Bar type='tpv' />:<Bar getTable={props.getTable} table={props.table} type='order' setNotification={props.setNotification} products={props.products} tableId={props.match.params.id}/>}
                <div style={{ height: 50 }}>
                    {props.flash && <Alert onClose={() => props.clearNotifications()} dismissible variant={props.flash.type}>{props.flash.message}</Alert>}
                </div>
                {props.children}
            </Fragment>
        )
}


const MSTP = state => (
    { 
        flash: state.main.flash,
        table: state.tpv.active,
        products:state.products
      
     }
)
const MDTP = dispatch => {
    return {
        clearNotifications: () => dispatch(clearNotification()),
        getTable: (id) => dispatch(getTable(id)),
        getProductList:()=>dispatch(getProductList()),
        setNotification:(type,msg)=>dispatch(setNotification(type,msg))
    }
}

export default connect(MSTP, MDTP)(TpvLayout);

