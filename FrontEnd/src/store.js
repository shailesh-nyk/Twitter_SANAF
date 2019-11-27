import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/redux/reducers/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// const initialState = {};
// const middleware = [thunk];
// const store = createStore(rootReducer,initialState,
//     compose(applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true, 
//       traceLimit: 25 })
//             ));


const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));            
export default store;