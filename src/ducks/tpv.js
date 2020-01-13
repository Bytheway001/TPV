import Axios from "axios";
import { API } from "../constants";
const TABLE_REQUESTED = 'TABLE_REQUESTED';
const TABLE_SUCCEEDED = 'TABLE_SUCCEEDED';
const TABLE_FAILED = 'TABLE_FAILED';

const LIST_REQUESTED = 'LIST_REQUESTED';
const LIST_SUCCEEDED = 'LIST_SUCCEEDED';
const LIST_FAILED = 'LIST_FAILED';

const onListRequested = ()=>({type:LIST_REQUESTED})
const onListSucceeded = (data)=>({type:LIST_SUCCEEDED,payload:data})
const onListFailed = ()=>({type:LIST_FAILED})

const onTableRequested = ()=>({type:TABLE_REQUESTED})
const onTableSucceeded = (data)=>({type:TABLE_SUCCEEDED,payload:data})
const onTableFailed = ()=>({type:TABLE_FAILED})

/* Actions */
export const getList=()=>{
    return dispatch => {
        dispatch(onListRequested());
        Axios.get(API).then(res => {
            dispatch(onListSucceeded(res.data.data))
        })
        .catch(err=>{
                dispatch(onListFailed())
        })
    }
}

export const getTable=(id)=>{
    return dispatch => {
        dispatch(onTableRequested());
        Axios.get(API+'/tables/'+id).then(res => {
            dispatch(onTableSucceeded(res.data.data))
        })
        .catch(err=>{
                dispatch(onTableFailed())
        })
    }
}

/* Initial State */
const initialState = {
    list: [],
    active: null,
    loading: false,
}
/* Reducer */


export const tpvReducer = (tables = initialState, action) => {
    switch (action.type) {
        case LIST_SUCCEEDED:
            return{
                ...tables,
                list:action.payload
            }
        case TABLE_SUCCEEDED:
            return {
                ...tables,
                active:action.payload
            }
        default:
            return tables
    }
}