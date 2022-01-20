import React from "react";
import { withRouter } from "react-router";

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  if (props.loading) {
    return null;
  }

  return (

    <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>

        <Typography style={{ display: "inherit" }} variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Sneed Farm
        </Typography>

        <nav>
          <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/" className={classes.link}>
            Home
          </Link>
        </nav>
      </Toolbar>
    </AppBar>

  )

}


export default withRouter(Navbar)