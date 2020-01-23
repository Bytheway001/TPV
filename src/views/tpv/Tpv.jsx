
import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getList } from '../../ducks/tpv';
const Tpv = props => {
    useEffect(() => {
        props.getList()
        //eslint-disable-next-line 
    }, [])
    return (
        <Fragment>
            <Container fluid style={{ padding: 15, paddingTop: 10 }}>
                <Row className='text-center'>
                    {
                        props.tableList.map(table => (
                            <Col xs={4} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                <TableButton id={table.table_id} variant={table.status==='closed'?'success':'danger'} />
                            </Col>
                        ))
                    }

                  
                </Row>
            </Container>
        </Fragment>
    )
}

const TableButton = props => {
    return <Button {...props} as={Link} to={'/tpv/'+props.id} style={{ fontSize: 24, marginBottom: 10 }} block>MESA {props.id}</Button>
}

const mapStateToProps = state => {
    return {
        tableList: state.tpv.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getList: () => { dispatch(getList()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tpv);