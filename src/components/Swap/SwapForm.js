import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    width: '50%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "48px 48px",
    border: `1px solid ${theme.palette.divider}`,
  },
  text: {
    backgroundColor: "white",
    border: `1px solid ${theme.palette.divider}`,
  }
});

class Swap extends Component {

  state = {
    fromCrypto: "",
    toCrypto: "",
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          type="text"
          name="fromCrypto"
          label="From"
          valuedefault="From"
          color="secondary"
          value={this.state.fromCrypto}
          variant="filled"
          onChange={this.handleChanges}
          className={classes.text}
        />

        <TextField
          id="filled-basic"
          type="text"
          name="toCrypto"
          label="To"
          color="secondary"
          valuedefault="To"
          value={this.state.toCrypto}
          variant="filled"
          onChange={this.handleChanges}
          className={classes.text}
        />
        <Button
          style={{ margin: "24px 0", fontWeight: "heavy", padding: "20px 146px", fontSize: "17px", width: "80%", maxWidth: "220px", whiteSpace: "nowrap" }}
          variant="contained"
          color="primary"
          disabled={this.state.error}
        >
          <Typography style={{ color: "black"}}>
            Swap
          </Typography>
        </Button>
      </form>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Swap);