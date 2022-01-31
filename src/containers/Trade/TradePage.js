import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Trade from "../../components/Trade/Trade";


const styles = (theme) => ({

  trade: {
    display: "flex",
    justifyContent: "space-around",
    '@media (max-width:800px)': {
      flexDirection: "column"
    },
    margin: "48px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
});

class TradePage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.trade}>
        <Trade />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(TradePage);