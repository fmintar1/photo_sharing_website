import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

//hook App to the real DOM, which is document.getElementById
ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root')
  );