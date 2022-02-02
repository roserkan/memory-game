import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App'
import './index.css'
import { getCookie } from './utilities/cookie';
import { setAuthorizationToken } from './utilities/setAuthorizationToken';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

const store = configureStore();
const jwtToken = getCookie('testToken');
if (jwtToken) setAuthorizationToken(jwtToken);

ReactDOM.render( <Provider store={store}><App token={jwtToken}/></Provider>, document.getElementById('root'));
