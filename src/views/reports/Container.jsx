import React from 'react'
import { connect } from 'react-redux';
import { ReportsIndex } from './Index';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { getDayBalance } from '../../ducks/reports';
const ReportsContainer = props => {
    return (
    <Container fluid style={{ padding: 30 }}>
        <Switch>
            <Route exact path='/reports' render={() => <ReportsIndex {...props} />} />
        </Switch>
    </Container>
    )
}

const MSTP = state => {
    return {
        balance:state.reports.balance
    }
}

const MDTP = dispatch => {
    return {
        getDayBalance:()=>dispatch(getDayBalance())
    }
}

export default connect(MSTP, MDTP)(ReportsContainer)