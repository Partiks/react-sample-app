import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './Hello';
import * as serviceWorker from './serviceWorker'; //not used at all right now in the app

ReactDOM.render(
  <h1>Hello, DevOps Frontend! V2.01 </h1>,
  //  <App />,
  document.getElementById("root")
);

//ReactDOM.render(<App />, document.getElementById("app-root"));

ReactDOM.render(<Hello time="did you know time is a social construct? " />, document.getElementById("hello"));
