import React from 'react'
import {render} from 'react-dom'
import App from './components/App';
import  './i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';

render((
    <App/>
), document.getElementById('app'));
