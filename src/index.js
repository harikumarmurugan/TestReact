import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route,Link,Root,Switch}from 'react-router-dom';
import {renderRoutes}from 'react-router-config';

import Home from './Home'
import {Provider} from 'react-redux';
//import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from  './Stores/reducer';

const store=createStore(reducer);

const routing=(
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/"  component={App}/>
        </Switch>       
    </div>
    </BrowserRouter>
  
    
)

ReactDOM.render(
    <Provider store={store}> 
    {routing}
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
