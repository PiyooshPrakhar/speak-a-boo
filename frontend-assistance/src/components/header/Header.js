import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import maleImage from "../../assets/images/male-logo.png";
import femaleImage from "../../assets/images/female-logo.png";
import "./Header.css";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../utils/ObjectUtil";

const muiStyles = {
  header_style: {
    height: "64px",
    boxShadow: "none",
    zIndex: 1001,
    backgroundColor: "#343335",
    userSelect: 'none'
  },

  user_name_style: {
    fontSize: "20px",
    lineHeight: "20px",
    fontWeight: "700",
    letterSpacing: "0px",
    textAlign: "left",
    height: "20px",
    left: "92.86%",
    right: "4.29%",
    top: "calc(50% - 16px/2 - 0.5px)",
  },

  app_name_style: {
    color: "#FFFFFF",
    fontSize: "20px",
  },

  app_initial_style: {
    fontWeight: "700",
    color: "#FFFFFF",
    fontSize: "24px",
  },
  toolbar_style: { paddingLeft: "5px !important" },
};

function Header(props) {
  const [logoFlag, setLogoFlag] = React.useState(false);
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLogoFlag((prevFlag) => !prevFlag);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={muiStyles.header_style}
      color="primary"
      enableColorOnDark
    >
      <Toolbar sx={muiStyles.toolbar_style}>
        {logoFlag ? (
          <img src={maleImage} alt="logo" className="header-image" />
        ) : (
          <img src={femaleImage} alt="logo" className="header-image" />
        )}
        <div style={{ width: "20px" }} />
        <Typography sx={muiStyles.app_name_style} noWrap>
          <span style={muiStyles.app_initial_style}>S</span>peak-
          <span style={muiStyles.app_initial_style}>a</span>-
          <span style={muiStyles.app_initial_style}>B</span>oo!
        </Typography>

        <div style={{ flexGrow: "1" }}></div>

        <div style={{ width: "10px" }} />

        {!isObjectEmpty(userProfile.data) && <Typography sx={muiStyles.user_name_style} noWrap>
          Welcome, {userProfile.data.firstName}<span className="greetings_margin">!</span>
        </Typography>}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
