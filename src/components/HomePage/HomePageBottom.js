import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme => ({
  container: {
    margin: "160px 0px 0px",
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%"
  },
  card: {
    margin: "48px 12px",
    width: "30%"
  },
  typography: {
    color: "black"
  },
  button: {
    margin: "100px 0px",
    padding: "20px 0px",
    width: "50%",
    fontSize: "20px",
  },
})));

const HomePageBottom = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography className={classes.typography} variant="h5">
            Swap whatever you want on Harmony Mainnet
          </Typography>
          <Button className={classes.button} variant="contained" color="secondary" href="/swap">
            Swap
          </Button>
        </div>
        <div className={classes.card}>
          <Typography className={classes.typography} variant="h5">
            Don't leave you Farm unmemmorized - Mint your Farm as an NFT
          </Typography>
          <Button className={classes.button} variant="contained" color="secondary" href="/trade">
            Trade
          </Button>
        </div>

      </div>
    </>
  )
}

export default HomePageBottom;