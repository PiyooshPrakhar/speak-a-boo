import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import Spinner from '../spinner/Spinner';
import { capitalizeFirstLetter } from "../../utils/StringUtil";
import "./Mic.css";

function Mic(props) {
  const theme = createTheme({
    components: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            fontWeight: 600,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            fontSize: "12px",
            display: "grid",
            placeContent: "center",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            overflow: "visible",
            width: "100%",
            height: "100%",
            top: "31px",
            left: "30px",
            backgroundColor: "black",
            opacity: "0.7",
            maxWidth: "none",
          },
        },
      },
    },
  });
  const btn = {
    border: "2px solid #0ff0fc",
    padding: "0",
    borderRadius: "100%",
    width: "150px",
    height: "150px",
    fontSize: "3em",
    color: "#fff",
    padding: "0",
    margin: "0",
    background: "#613659",
    position: "relative",
    display: "inlineBlock",
    lineHeight: "100px",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "2",
  };

  const pulseRing = {
    content: "",
    width: "150px",
    height: "150px",
    background: "#367588",
    border: "5px solid #367588",
    borderRadius: "50%",
    animation: "pulsate infinite 1.5s",
    zIndex: "1",
    position: "absolute",
  };

  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "180px",
  };
  return (
    <div className="mic__container">
      <IconButton
        onClick={props.stopListening}
        sx={{
          color: "rgb(158, 158, 158)",
          paddingLeft: "2px",
          paddingRight: "1.7px",
          paddingTop: "20px",
          paddingBottom: "2px",
          position: "relative",
          left: "calc(100% - 40px)",
          marginTop: "-30px",
        }}
      ></IconButton>
      <DialogContent>
        {props.loading ? (
          <Spinner />
        ) : (
          <>
            <div style={container}>
              <Button sx={btn}>
                <MicIcon sx={{ fontSize: "75px", color: "#00FFFF" }} />
              </Button>
              <div style={pulseRing}></div>
            </div>
            <p
              style={{
                fontSize: "25px",
                color: "#00FFFF",
                textAlign: "center",
                padding: "30px 120px",
              }}
            >
              {capitalizeFirstLetter(props.transcript)}
            </p>
          </>
        )}
      </DialogContent>
    </div>
  );
}

export default Mic;
