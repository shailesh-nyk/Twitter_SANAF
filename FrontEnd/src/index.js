import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from "./store";
//import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from '../src/redux/reducers/root-reducer'
//import thunk from 'redux-thunk';

/*const middleware = [thunk];
const store = createStore(rootReducer, compose(applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true, 
  traceLimit: 25 })
        ));*/


ReactDOM.render(
    <BrowserRouter>
     <Provider store={store}>
       <App />
     </Provider>
   </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
