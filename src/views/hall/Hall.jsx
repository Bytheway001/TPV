import React, { useEffect } from 'react';
import Table from './Table';
import { Row, Col, Container, Card } from 'react-bootstrap';
import TableDetail from './TableDetail';
import { connect } from 'react-redux';
import { getTableList, setActiveTable, closeTable } from '../../ducks/tables';

const Hall = props => {
    useEffect(() => {
        props.getTableList()
        //eslint-disable-next-line 
    }, [])
  


    return (
        <Container fluid style={{ padding: 30 }}>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header>Mesas</Card.Header>
                        <Card.Body className='d-flex flex-wrap flex-row justify-content-center'>
                            {props.list.map((table, index) => (
                                <Table table={table} key={index} onSwitch={props.setActiveTable} active={props.activeTable?props.activeTable.table_id === table.table_id:null} status={table.status} />
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    {props.activeTable && <TableDetail table={props.activeTable} closeTable={props.closeTable}/>}
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    list: state.tables.list,
    activeTable: state.tables.selected
})

const mapDispatchToProps = dispatch => ({
    getTableList: () => dispatch(getTableList()),
    setActiveTable: (id) => dispatch(setActiveTable(id)),
    closeTable:(id)=>dispatch(closeTable(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Hall);