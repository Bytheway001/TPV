/* Action Types */
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

/* Action Creators */
export const onSetNotification = (data)=>({type:SET_NOTIFICATION,payload:data})
export const onClearNotification = ()=>({type:CLEAR_NOTIFICATION})
/* Actions */

export const setNotification=(type,message)=>{
    return dispatch=>{
        dispatch(onSetNotification({type,message}))
    }
}

export const clearNotification=()=>{
    return dispatch=>{
        dispatch(onClearNotification())
    }
}
/* Initial state */

const initialState={
    flash:null
}
/* reducer */

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                flash:action.payload
            }
        case CLEAR_NOTIFICATION:
            return{
                ...state,
                flash:null
            }
        default:
            return state
    }
}

