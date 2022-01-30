import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const HomePageTop = (props) => {

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        <div style={{ margin: "48px 12px", width: "30%" }}>
          <Typography style={{ color: "black" }} variant="h5">
            Sneedfarm gamifies yield farming. More copy here
          </Typography>
          <Button style={{ margin: "100px 0px", padding: "20px 0px", width: "50%", fontSize: "20px" }} variant="contained" color="secondary" href="/farm">
            Try Now
          </Button>
        </div>
        <div style={{border: "1px solid black", display: "flex", justifyContent: "center", width: "50%"}}>
          <h2 style={{ margin: "100px 0px", color: "black", }}>
            IMAGE HERE
          </h2>
        </div>

      </div>
    </>
  )
}

export default HomePageTop;