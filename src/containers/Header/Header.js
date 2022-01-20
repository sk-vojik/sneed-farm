import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MobileNavbar from "../../components/Navbar/MobileNavbar"

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  navBar: {
    '@media (max-width:800px)': {
      display: "none"
    },
  },
  mobileNavBar: {
    '@media (min-width:800px)': {
      display: "none"
    },
  },
  title: {
    fontSize: "60px",
    marginBottom: "0px",
    fontWeight: "100",
    letterSpacing: "24px",
    '@media (max-width:800px)': {
      letterSpacing: "10px",
      fontSize: "2rem"
    },
  },
  tagline: {
    '@media (max-width:800px)': {
      fontSize: ".6rem"
    },
  }
});

class Header extends Component {

  render() {

    const { classes } = this.props;
    return (
      <>
        <div className={classes.navBar}>
          <Navbar loading={this.props.loading} user={this.props.loggedInUser} />
        </div>
        <div className={classes.mobileNavBar}>
          <MobileNavbar loading={this.props.loading} user={this.props.loggedInUser} />
        </div>
        <div className="">
          <h1 id="title" className={classes.title}>Sneed Farm</h1>
        </div>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Header);