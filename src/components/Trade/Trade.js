import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme => ({
  root: {
    width: 300,
    maxWidth: 800,
    color: "primary",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  container: {
    width: "90%",
    display: "flex"
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "45%",
  },
  tradeButton: {
    width: "50%",
    padding: "24px 0px"
  }

})));

const Trade = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>

        <div style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: "column", width: "55%" }}>

          <div style={{ border: "1px solid black", display: "flex", justifyContent: "center", width: "80%", height: "400px" }}>
            <h2 style={{ margin: "100px 0px", color: "black", }}>
              IMAGE HERE
            </h2>
          </div>

          <div style={{ margin: "48px 12px", width: "30%" }}>
            <Button style={{  padding: "20px 0px", width: "100%", fontSize: "20px" }} variant="contained" color="secondary" href="/farm">
              Mint An NFT
            </Button>
          </div>

        </div>

        <div className={classes.cardContainer}>
          <Typography style={{ color: "black", margin: "0px 0px 24px" }} variant="h5">
            Live Trades - Click to Trade!
          </Typography>
          <Button variant="contained" color="primary" className={classes.tradeButton}>
            <Typography style={{ color: "black", textTransform: "none" }} gutterBottom variant="h6" component="div">
              A Random Trade
            </Typography>
          </Button>
          <Button variant="contained" color="primary" className={classes.tradeButton}>
            <Typography style={{ color: "black", textTransform: "none" }} gutterBottom variant="h6" component="div">
              Another Random Trade
            </Typography>
          </Button>
          <Button variant="contained" color="primary" className={classes.tradeButton}>
            <Typography style={{ color: "black", textTransform: "none" }} gutterBottom variant="h6" component="div">
              A Third Trade
            </Typography>
          </Button>
          <Button variant="contained" color="primary" className={classes.tradeButton}>
            <Typography style={{ color: "black", textTransform: "none" }} gutterBottom variant="h6" component="div">
              Even more trades
            </Typography>
          </Button>
        </div>

      </div>
    </>
  )
}

export default Trade;