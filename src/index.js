import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import { BrowserRouter } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
