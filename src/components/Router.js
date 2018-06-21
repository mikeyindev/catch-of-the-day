import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// If you just say 'StorePicker' without the relative path, it'll look in the
// node_modules directory
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter basename="/cornucopia-of-the-sea/">
    <Switch>
      { /* If URL matches "/", return StorePicker component */}
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      { /* If URL is not found, return notFound component. When the value of the props is not a string. It's put inside curly braces */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
