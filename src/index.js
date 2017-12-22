import React from 'react';
import { render } from 'react-dom'; // Only importing render method from react-dom module
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/style.css';

import StorePicker from './components/StorePicker'; 
// If you just say 'StorePicker' without the relative path, it'll look in the node_modules directory
import App from './components/App';
import NotFound from './components/NotFound';

const repo = `/${window.location.pathname.split('/')[1]}`;
// Routing
const Root = () => {
    return (
        <BrowserRouter basename="/getting-fishy/">
            { /* If URL matches "/", return StorePicker component */ }
            <Switch>
                <Route exact path="/" component={StorePicker} />
                <Route path="/store/:storeId" component={App} />
                { /* If URL is not found, return notFound component. When the value of the props is not a string. It's put inside curly braces */ }
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

// Render the StorePicker component to id 'main' in index.html. Can also use getElementById()
render(<Root/>, document.querySelector('#main'));
