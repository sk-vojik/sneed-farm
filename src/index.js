import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
         body: {
           background: 'linear-gradient(#F2F5EF 30%, #Cfe2bb 90%)',
           backgroundRepeat: "no-repeat",
           backgroundAttachment: "fixed",
        },
      },
    },
  },
  typography: {
    "fontFamily": `"Courier", "New", "Arial", sans-serif`,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#Cfe2bb',
    },
    secondary: {
      main: "#47752a",
    }
  },
});

ReactDOM.render(<Router>  <ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider></Router>, document.getElementById('root'));