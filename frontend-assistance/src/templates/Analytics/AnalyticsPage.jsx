import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { AreaChart } from "../../components/charts";
import { BrushChart } from "../../components/charts";
import { ScatterChart } from "../../components/charts";
import { RadarChart } from "../../components/charts";
import Spinner from "../../components/spinner/Spinner";
import Header from "../../components/header/Header";
import NavDrawer from "../../components/navDrawer/NavDrawer";
import "./AnalyticsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { chatService } from "../../services";

function AnalyticsPage() {
  const userProfile = useSelector((state) => state.userProfile);
  const userChat = useSelector((state) => state.userChat);
  const dispatch = useDispatch();
  const muiStyles = {
    paperBlock: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: "calc((100vh - 64px)/2)",
      ":hover": {
        boxShadow: 12,
      },
    },
  };

  useEffect(() => {
    dispatch(chatService.getDataPoint(userProfile?.data));
  }, []);

  return (
    <>
      <Header />
      <NavDrawer />
      {userChat.loading ? (
        <div style={{ marginTop: "100px" }}>
          <Spinner />
        </div>
      ) : (
        <div>
          <Box>
            <Box className="analytics__container">
              <div className="analytics__chart">
                <Paper sx={muiStyles.paperBlock} elevation={1}>
                  <BrushChart datapoints={userChat.datapoints} />
                </Paper>
              </div>
              <div className="analytics__chart">
                <Paper sx={muiStyles.paperBlock} elevation={1}>
                  <RadarChart datapoints={userChat.datapoints} />
                </Paper>
              </div>
            </Box>
            <Box sx={{ margin: '0px 15px 0px 75px'}}>
              <div className="analytics__chart">
                <Paper sx={muiStyles.paperBlock} elevation={1}>
                  <ScatterChart datapoints={userChat.datapoints} />
                </Paper>
              </div>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}

export default AnalyticsPage;
