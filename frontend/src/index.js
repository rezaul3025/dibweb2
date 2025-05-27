import React from 'react'
import {render} from 'react-dom'
import  './i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from "./components-tailwind/App";
import './tailwind.css';
import 'preline/preline'
import 'preline/variants.css'
import './i18n-v2'

render((
    <App/>
), document.getElementById('app'));
