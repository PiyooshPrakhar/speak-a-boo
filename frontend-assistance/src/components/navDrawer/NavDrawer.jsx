import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDispatch, useSelector } from "react-redux";
import { dialogActionCreator, pageActionCreator } from "../../actions";
import { NAV_PANEL } from "../../constants/AppConstant";

const muiStyles = {
  top_level_drawer_style: {
    marginLeft: "0px",
    color: "#ffffff",
    backgroundColor: "#343335",
    top: "64px",
    width: "60px",
    height: "calc(100vh - 64px)",
    overflow: "hidden",
  },

  top_level_selected_style: {
    height: "48px",
    paddingLeft: 0,
    "&:hover": {
      background: "#4E4D4E",
    },
    borderLeft: "4px solid",
    borderColor: "#D6002A",
    backgroundColor: "#4E4D4E",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  top_level_unselected_style: {
    opacity: "0.25",
    height: "48px",
    paddingLeft: 0,
    "&:hover": {
      background: "#4E4D4E",
    },
    borderLeft: "4px solid",
    borderColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  top_level_icon_style: {
    color: "#ffffff",
    minWidth: 32,
    marginLeft: "11px",
    alignItems: "center",
    justifyContent: "center",
  },
  navbar_list_container: {
    paddingTop: "0px",
    paddingBottom: "0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

function NavDrawer(props) {
  const pageSelection = useSelector((state) => state.page);
  const [selectedFeature, setSelectedFeature] = useState(
    pageSelection.currentPage || "Dashboard"
  );
  const list_icon_style = (item) => {
    if (selectedFeature === item.title)
      return muiStyles.top_level_selected_style;
    else return muiStyles.top_level_unselected_style;
  };

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { listening } = useSpeechRecognition();
  const synth = window.speechSynthesis;

  useEffect(() => {
    if (pageSelection.currentPage == null)
      dispatch(pageActionCreator.setNextPage("Dashboard"));
    if (pageSelection.previousPage === "Logout")
      setSelectedFeature(pageSelection.currentPage);
  }, [pageSelection]);

  const routeHandler = (panelEntry) => {
    if (panelEntry.title) {
      if (listening) {
        SpeechRecognition.stopListening();
      }
      if (synth.speaking) {
        synth.cancel();
      }
      dispatch(pageActionCreator.setNextPage(panelEntry.title));
      setSelectedFeature(panelEntry.title);
      navigator(panelEntry.path);
    }
  };

  const logoutHandler = (panelEntry) => {
    dispatch(pageActionCreator.setNextPage(panelEntry.title));
    setSelectedFeature(panelEntry.title);
    dispatch(dialogActionCreator.showLogoutDialog(true));
  };

  const topLevelMenuIcons = NAV_PANEL.map((panelEntry, i) => {
    if (panelEntry.title !== "Logout") {
      return (
        <ListItem
          key={panelEntry.title}
          sx={list_icon_style(panelEntry)}
          onClick={() => routeHandler(panelEntry)}
        >
          <Tooltip title={panelEntry.tooltip} placement="right">
            <ListItemIcon sx={muiStyles.top_level_icon_style}>
              {panelEntry.icon}
            </ListItemIcon>
          </Tooltip>
        </ListItem>
      );
    } else return null;
  });

  const bottomLevelMenuIcons = NAV_PANEL.map((panelEntry, i) => {
    if (panelEntry.title === "Logout") {
      return (
        <ListItem
          key={panelEntry.title}
          sx={list_icon_style(panelEntry)}
          onClick={() => logoutHandler(panelEntry)}
        >
          <Tooltip title={panelEntry.tooltip} placement="right">
            <ListItemIcon sx={muiStyles.top_level_icon_style}>
              {panelEntry.icon}
            </ListItemIcon>
          </Tooltip>
        </ListItem>
      );
    } else return null;
  });

  return (
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{ sx: muiStyles.top_level_drawer_style }}
      >
        <List sx={muiStyles.navbar_list_container}>
          <div>{topLevelMenuIcons}</div>
          <div>{bottomLevelMenuIcons}</div>
        </List>
      </Drawer>
    </Box>
  );
}

export default NavDrawer;
