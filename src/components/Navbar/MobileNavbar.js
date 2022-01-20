import React from "react";
import { withRouter } from "react-router";

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DehazeIcon from '@material-ui/icons/Dehaze';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  mobileToolBar: {
    '@media (max-width:800px)': {
      display: "none"
    },
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  navBar: {
    '@media (max-width:800px)': {
      display: "none"
    },
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

const MobileNavbar = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);

    localStorage.clear();
    window.location.reload();
  }


  if (props.loading) {
    return null;
  }

  return (

    <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.root}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <DehazeIcon />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>
                          <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/" className={classes.link}>
                            Home
                          </Link>
                        </MenuItem>
                        {props.user.userId ?
                          <div>
                            <MenuItem onClick={handleClose}>
                              <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/profile" className={classes.link}>
                                Profile
                              </Link>
                            </MenuItem>
                          </div>
                          : null
                        }
                        {props.user.isAdmin ?
                          <div>
                            <MenuItem onClick={handleClose}>
                              <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/users" className={classes.link}>
                                Users
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/admin/addAuction" className={classes.link}>
                                Add Auction
                              </Link>
                            </MenuItem>
                          </div>
                          : null
                        }
                        {!props.user.userId ?
                          <MenuItem onClick={handleClose}>
                            <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/login" className={classes.link}>
                              Login
                            </Link>
                          </MenuItem>
                          : props.user.userId ?
                            <MenuItem onClick={handleLogout}>
                              <Link style={{ textDecoration: 'none' }} variant="button" color="textPrimary" href="/login" className={classes.link}>
                                Logout
                              </Link>
                            </MenuItem>
                            : null
                        }
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      </Toolbar>
    </AppBar>

  )

}

export default withRouter(MobileNavbar)