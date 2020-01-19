import React, { Fragment } from 'react';

import Bar from '../Navbar';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { clearNotification } from '../../ducks/main';

const Main = props => {
    return (
        <Fragment>
            <Bar type='pc' />
            <div style={{ height: 50 }}>
                {props.flash && <Alert onClose={() => props.clearNotifications()} dismissible variant={props.flash.type}>{props.flash.message}</Alert>}
            </div>

            {props.children}
        </Fragment>
    )
}


const MSTP = state => (
    { flash: state.main.flash }
)
const MDTP = dispatch => {
    return {
        clearNotifications: () => dispatch(clearNotification())
    }
}

export default connect(MSTP, MDTP)(Main);