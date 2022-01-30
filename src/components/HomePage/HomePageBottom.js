import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const HomePageBottom = (props) => {

  return (
    <>
      <div style={{ margin: "160px 0px 0px", display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        <div style={{ margin: "48px 12px", width: "30%" }}>
          <Typography style={{ color: "black" }} variant="h5">
            Swap whatever you want on Harmony Mainnet
          </Typography>
          <Button style={{ margin: "100px 0px", padding: "20px 0px", width: "50%", fontSize: "20px" }} variant="contained" color="secondary" href="/swap">
            Swap
          </Button>
        </div>
        <div style={{ margin: "48px 12px", width: "30%" }}>
          <Typography style={{ color: "black" }} variant="h5">
            Don't leave you Farm unmemmorized - Mint your Farm as an NFT
          </Typography>
          <Button style={{ margin: "100px 0px", padding: "20px 0px", width: "50%", fontSize: "20px" }} variant="contained" color="secondary" href="/trade">
            Trade
          </Button>
        </div>

      </div>
    </>
  )
}

export default HomePageBottom;