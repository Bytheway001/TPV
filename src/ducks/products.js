import Axios from 'axios'
import { API } from '../constants';
import { setNotification } from './main';

/* Action Types */
export const PRODUCT_LIST_REQUESTED = 'PRODUCT_LIST_REQUESTED'
export const PRODUCT_LIST_SUCCEEDED = 'PRODUCT_LIST_SUCCEEDED'
export const PRODUCT_LIST_FAILED = 'PRODUCT_LIST_FAILED'

export const PRODUCT_CREATE_REQUESTED = 'PRODUCT_CREATE_REQUESTED'
export const PRODUCT_CREATE_SUCCEEDED = 'PRODUCT_CREATE_SUCCEEDED'
export const PRODUCT_CREATE_FAILED = 'PRODUCT_CREATE_FAILED'

export const PRODUCT_TOGGLE_REQUESTED = "PRODUCT_TOGGLE_REQUESTED"
export const PRODUCT_TOGGLE_FAILED = "PRODUCT_TOGGLE_FAILED"
export const PRODUCT_TOGGLE_SUCCEEDED = "PRODUCT_TOGGLE_SUCCEEDED";

/* Action Creators */
export const onProductsListRequested = () => ({ type: PRODUCT_LIST_REQUESTED })
export const onProductsListSucceeded = data => ({ type: PRODUCT_LIST_SUCCEEDED, payload: data })
export const onProductsListFailed = err => ({ type: PRODUCT_LIST_FAILED, payload: err })

export const onProductCreateRequested = () => ({ type: PRODUCT_CREATE_REQUESTED })
export const onProductCreateSucceeded = () => ({ type: PRODUCT_CREATE_SUCCEEDED })
export const onProductCreateFailed = () => ({ type: PRODUCT_CREATE_FAILED })

export const onProductToggleRequested = ()=>({ type: PRODUCT_TOGGLE_REQUESTED })
export const onProductToggleSucceeded = ()=>({ type: PRODUCT_TOGGLE_SUCCEEDED })
export const onProductToggleFailed = ()=>({ type: PRODUCT_TOGGLE_FAILED })
/* Actions */
export const getProductList = () => {
    return dispatch => {
        dispatch(onProductsListRequested());
        Axios.get(API + '/products').then(res => {
            dispatch(onProductsListSucceeded(res.data.data))
        })
            .catch(err => {
                dispatch(onProductsListFailed(err))
            })
    }
}

export const createProduct = ({ name, family, price }) => {
    return dispatch => {
        dispatch(onProductCreateRequested());
        Axios.post(API + '/products', { product: { name, family, price } }).then(res => {
            dispatch(onProductCreateSucceeded(res.data.data))
            dispatch(setNotification('success', res.data.data))
            dispatch(getProductList())
        })
            .catch(err => {
                dispatch(onProductCreateFailed(err))
            })
    }
}

export const toggleProduct = (id)=>{
    return dispatch => {
        dispatch(onProductToggleRequested());
        Axios.get(API + '/products/'+id+'/toggle').then(res => {
            dispatch(onProductToggleSucceeded(res.data.data))
            dispatch(setNotification('success',res.data.data))
            dispatch(getProductList())
        })
            .catch(err => {
                dispatch(setNotification('danger',"Error"))
                dispatch(onProductToggleFailed(err))
            })
    }
}
/* Initial state */
const initialState = {
    list: [],
    selected: null,
    loading: false
}
/* reducer */

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_LIST_SUCCEEDED:
            return {
                ...state,
                loading: false,
                list: action.payload
            }
        case PRODUCT_LIST_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}