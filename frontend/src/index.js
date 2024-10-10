import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';
import  './i18n';

render((
    <App/>
), document.getElementById('app'));
