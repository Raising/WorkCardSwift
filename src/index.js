import React from 'react';
import ReactDOM from 'react-dom';
import './enhancement/index.ts';
import './index.css';

import reportWebVitals from './reportWebVitals';
import MainTableTime from './modules/timetable/time-table-main';

ReactDOM.render(
  <React.StrictMode>
    <MainTableTime></MainTableTime>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
