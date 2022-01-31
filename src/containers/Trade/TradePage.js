import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Trade from "../../components/Trade/Trade";


const styles = (theme) => ({

  home: {
    display: "flex",
    justifyContent: "space-around",
    '@media (max-width:800px)': {
      flexDirection: "column"
    },
  },

});

class TradePage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: "48px 0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className={classes.home}>
          <Trade />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(TradePage);