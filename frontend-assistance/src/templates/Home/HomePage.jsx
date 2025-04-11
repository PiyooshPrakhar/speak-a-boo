import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TherapySession from "../Session/TherapySession";
import Header from "../../components/header/Header";
import NavDrawer from "../../components/navDrawer/NavDrawer";
import "./HomePage.css";

export default function HomePage() {
  const [startSession, setStartSession] = React.useState(false);
  const handleSession = (status) => {
    setStartSession(status);
  };

  const muiStyles = {
    backdrop: {
      color: "#fff",
      backgroundColor: "#000000",
      opacity: "0.8 !important",
    },
    alignInstructions: {
      textAlign: "center",
      cursor: "pointer",
    },
  };

  return (
    <>
      <Header />
      <NavDrawer />
      <div>
        {startSession ? (
          <TherapySession handleSession={handleSession}/>
        ) : (
          <Backdrop sx={muiStyles.backdrop} open={!startSession}>
            <Divider />
            <Typography
              variant="h5"
              component="h4"
              sx={muiStyles.alignInstructions}
              onClick={() => handleSession(true)}
            >
              <div className="session__beginText">
                Click here to begin
                <br />
                the therapy session
              </div>
            </Typography>
            <Divider />
          </Backdrop>
        )}
      </div>
    </>
  );
}
