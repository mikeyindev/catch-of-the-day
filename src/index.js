import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

// Render the StorePicker component to id 'main' in index.html. Can also use
// getElementById()
render(<Router />, document.querySelector('#main'));
