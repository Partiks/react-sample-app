import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './Hello';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <h1>Hello, DevOps Frontend! </h1>,
  //  <App />,
  document.getElementById("root")
);

//ReactDOM.render(<App />, document.getElementById("app-root"));

ReactDOM.render(<Hello time="did you know time is a social construct? " />, document.getElementById("hello"));
