import React from "react";
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme => ({
  root: {
    width: 300,
    maxWidth: 800,
    color: "primary",
  },
  container: {
    display: "flex",
    margin: "240px 0px 0px",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  typography: {
    color: "black"
  },

})));

const HomePageMid = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card variant="outlined" style={{backgroundColor: "#Cfe2bb" }} className={classes.root}>
        <CardContent>
            <Typography className={classes.typography} gutterBottom variant="h5" component="div">
              Total Players
            </Typography>
            <Typography className={classes.typography} variant="body2">
              4200
            </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" style={{backgroundColor: "#Cfe2bb" }}  className={classes.root}>
        <CardContent>
            <Typography className={classes.typography} gutterBottom variant="h5" component="div">
              In-game time
            </Typography>
            <Typography className={classes.typography} variant="body2">
              4200 Hours
            </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" style={{backgroundColor: "#Cfe2bb" }}  className={classes.root}>
        <CardContent>
            <Typography className={classes.typography} gutterBottom variant="h5" component="div">
              TVL
            </Typography>
            <Typography className={classes.typography} variant="body2">
              $420 Million
            </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePageMid;