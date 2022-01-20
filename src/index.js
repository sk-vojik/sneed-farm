import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#d4e157',
    },
    secondary: {
      main: "#ed4b82",
    }
  },
});

ReactDOM.render(<Router>  <ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider></Router>, document.getElementById('root'));