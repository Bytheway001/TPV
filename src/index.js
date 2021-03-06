import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware,combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { tablesReducer } from './ducks/tables';
import { tpvReducer } from './ducks/tpv';
import { productsReducer } from './ducks/products';
import { mainReducer } from './ducks/main';
import { reportsReducer } from './ducks/reports';
const rootReducer = combineReducers({
    main:mainReducer,
    tables:tablesReducer,
    tpv:tpvReducer,
    products:productsReducer,
    reports:reportsReducer
});
const middleware = [thunk];
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
