import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// const initialState = {};

const middleware = [thunk];

/** Agregar el localStorage, si existe lo convierto en objeto */
// const storageState = localStorage.getItem('citas') ? JSON.parse( localStorage.getItem('citas') ) : [];
const storageState = localStorage.getItem('user') ? JSON.parse( localStorage.getItem('user') ) : [];

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store;

if (process.env.NODE_ENV !== 'production') {
    // hacerAlgoEnDesarrollo();
    store = createStore(rootReducer, storageState, compose(applyMiddleware(...middleware), devtools));
  } else {
    //hacerAlgoEnProd();
    store = createStore(rootReducer, storageState, compose(applyMiddleware(...middleware)));
  }

export default store;