import React from 'react';
import {Container} from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { ProductsList } from './List';
import { connect } from 'react-redux';
import { getProductList, createProduct, toggleProduct } from '../../ducks/products';

export const ProductsContainer = props => {
    return(
        <Container fluid style={{ padding: 30 }}>
            <Switch>
                <Route exact path='/hall/products' render={()=><ProductsList {...props}/>}/>
            </Switch>
        </Container>
    )
}

const mapStateToProps = state =>(
    {products:state.products}
)

const mapDispatchToProps = dispatch =>(
    {
        getProductList:()=>dispatch(getProductList()),
        createProduct:({name,family,price})=>dispatch(createProduct({name,family,price})),
        toggleProduct:(id)=>dispatch(toggleProduct(id))
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(ProductsContainer)