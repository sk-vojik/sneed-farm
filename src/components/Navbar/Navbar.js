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
    display: 'flex',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "black",
    textDecoration: 'none',
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
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
  nav: {
    display: "flex", 
    width: "85%", 
    flexDirection: "row", 
    justifyContent: "space-between",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  if (props.loading) {
    return null;
  }

  return (

    <AppBar position="sticky" color="primary" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>

        <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/" className={classes.link}>
          <Typography style={{ margin: "0px 12px 0px 0px", display: "inherit", color: "black" }} variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Sneed Farm
          </Typography>
        </Link>


        <nav className={classes.nav}>
          <div>
            <Link variant="button" color="textPrimary" href="/farm" className={classes.link}>
              Play
            </Link>
            <Link variant="button" color="textPrimary" href="/swap" className={classes.link}>
              Swap
            </Link>
            <Link variant="button" color="textPrimary" href="/trade" className={classes.link}>
              Trade
            </Link>
          </div>
          <div>
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Metamask
            </Link>
          </div>
        </nav>
      </Toolbar>
    </AppBar>

  )

}


export default withRouter(Navbar)