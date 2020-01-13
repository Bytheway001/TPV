import Axios from 'axios'
import { API } from '../constants';
/* Action Types */
export const TABLE_LIST_REQUESTED = "TABLE_LIST_REQUESTED";
export const TABLE_LIST_SUCCEEDED = "TABLE_LIST_SUCCEEDED";
export const TABLE_LIST_FAILED = "TABLE_LIST_FAILED";

export const SET_ACTIVE_TABLE = "SET_ACTIVE_TABLE";

export const CLOSE_TABLE_REQUESTED = 'CLOSE_TABLE_REQUESTED';
export const CLOSE_TABLE_SUCCEEDED = 'CLOSE_TABLE_SUCCEEDED';
export const CLOSE_TABLE_FAILED = 'CLOSE_TABLE_FAILED';


/* Action Creators */
export const onTableListRequested = () => ({ type: TABLE_LIST_REQUESTED })
export const onTableListSucceeded = (data) => ({ type: TABLE_LIST_SUCCEEDED, payload: data })
export const onTableListFailed = () => ({ type: TABLE_LIST_FAILED })

export const onSetActiveTable= (id)=>({type:SET_ACTIVE_TABLE,payload:id})

export const onCloseTableRequested = ()=>({type:CLOSE_TABLE_REQUESTED})
export const onCloseTableSucceeded = (data)=>({type:CLOSE_TABLE_SUCCEEDED,payload:data})
export const onCloseTableFailed = ()=>({type:CLOSE_TABLE_FAILED})
/* Actions */
export const getTableList = () => {
    return dispatch => {
        dispatch(onTableListRequested());
        Axios.get(API).then(res => {
            dispatch(onTableListSucceeded(res.data.data))
        })
        .catch(err=>{
                dispatch(onTableListFailed())
        })
    }
}

export const setActiveTable=(id)=>{
    return dispatch =>{
        Axios.get(API+'/tables/'+id).then(res=>{
            dispatch(onSetActiveTable(res.data.data))
        })
    }
}

export const closeTable=(id)=>{
    return dispatch=>{
        Axios.get(API+'/tables/'+id+'/close').then(res=>{
            dispatch(onCloseTableSucceeded(res.data.data))
        })
    }
}
/* Initial State */
const initialState = {
    list: [],
    selected: null,
    loading: false
}

/* Reducer */
export const tablesReducer = (tables = initialState, action) => {
    switch (action.type) {
        case TABLE_LIST_REQUESTED:
            return {
                ...tables,
                loading: true
            }
        case TABLE_LIST_SUCCEEDED:
            return {
                ...tables,
                loading: false,
                list: action.payload
            }
        case TABLE_LIST_FAILED:
            return {
                ...tables,
                loading: false
            }
        case SET_ACTIVE_TABLE:
            let activeTable = action.payload
            return {
                ...tables,
                selected:activeTable
            }
        case CLOSE_TABLE_SUCCEEDED:
            return{
                ...tables,
                selected:null
            }
        default:
            return tables
    }
}

