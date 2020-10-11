import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import counterReducer from "./reducers/reducer";


const store = createStore(counterReducer);

const renderApp = () => {
    ReactDOM.render(<App store={store} />, document.querySelector('#root'));
}
renderApp();
store.subscribe(renderApp);