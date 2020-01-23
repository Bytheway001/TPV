import Axios from 'axios'
import { API } from '../constants';
export const DAY_BALANCE_REQUESTED = 'DAY_BALANCE_REQUEST';
export const DAY_BALANCE_SUCCEEDED = 'DAY_BALANCE_SUCCEEDED';
export const DAY_BALANCE_FAILED = 'DAY_BALANCE_FAILED';

export const onDayBalanceRequested=()=>({type:DAY_BALANCE_REQUESTED})
export const onDayBalanceSucceeded=(data)=>({type:DAY_BALANCE_SUCCEEDED,payload:data})
export const onDayBalanceFailed=()=>({type:DAY_BALANCE_FAILED})


export const getDayBalance = () => {
    return dispatch => {
        dispatch(onDayBalanceRequested());
        Axios.get(API + '/balance').then(res => {
            dispatch(onDayBalanceSucceeded(res.data.data))
        })
            .catch(err => {
                dispatch(onDayBalanceFailed(err))
            })
    }
}


const initialState = {
    balance:[],
    
    loading: false
}



export const reportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DAY_BALANCE_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case DAY_BALANCE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                balance: action.payload
            }
        case DAY_BALANCE_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}