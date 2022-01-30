import React, { Component } from "react";
import HomePageTop from "../../components/HomePage/HomePageTop";
import HomePageBottom from "../../components/HomePage/HomePageBottom";
import { withStyles } from "@material-ui/core/styles";
import HomePageMid from "../../components/HomePage/HomePageMid";


const styles = (theme) => ({

  home: {
    display: "flex",
    justifyContent: "space-around",
    '@media (max-width:800px)': {
      flexDirection: "column"
    },
  },

});

class HomePage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: "48px 0px", display: "flex", flexDirection: "column" }} className={classes.home}>
          <HomePageTop />
          <HomePageMid />
          <HomePageBottom />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);