import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({

  home: {
    display: "flex",
    justifyContent: "space-around",
    '@media (max-width:800px)': {
      flexDirection: "column"
    },
  },

});

class Game extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: "6px 0px" }} className={classes.home}>
        Gaming
      </div>
    )
  }
}

export default (withStyles(styles, { withTheme: true })(Game));