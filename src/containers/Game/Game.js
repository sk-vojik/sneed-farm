import React, { Component } from "react";
import InnerHTML from 'dangerously-set-html-content'

import useScript from "../../components/useScript";

import "./GamePage_Style.css";

import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({

  home: {
    display: "flex",
    justifyContent: "space-around",
    '@media (max-width:800px)': {
      flexDirection: "column"
    },
  },

  game: {
    width: "1152",
    height: "576",
    border: "1px solid red"
  }

});

const Game = props => {

  useScript("../../Scripts/Engine/main.js");
  useScript("../../Scripts/Blockchain/web3.js");
  useScript("../../Scripts/Blockchain/metamask.js");
  useScript("https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js");

  return (
    <>
      <Typography style={{ margin: "6px 0px", color: "black" }}>
        Gaming
      </Typography>

      <div className="body">
        <div className="Game__container">
          <div className="canvas">
            <canvas
              id="playground"
              width="1152"
              height="576"
              className="game"
            ></canvas>
          </div>
        </div>
      </div>
    </>
  )
}


export default (withStyles(styles, { withTheme: true })(Game));
