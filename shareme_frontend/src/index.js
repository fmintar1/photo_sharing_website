import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

//hook App to the real DOM, which is document.getElementById
ReactDOM.render(<App />, document.getElementById('root'));