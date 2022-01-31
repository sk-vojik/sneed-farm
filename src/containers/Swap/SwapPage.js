import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwapForm from "../../components/Swap/SwapForm";


const styles = (theme) => ({

  home: {
    display: "flex",
    justifyContent: "space-around",
    '@media (max-width:800px)': {
      flexDirection: "column"
    },
  },

});

class SwapPage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: "48px 0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className={classes.home}>
          <SwapForm />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SwapPage);