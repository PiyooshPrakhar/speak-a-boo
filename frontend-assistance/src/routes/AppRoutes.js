import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authentication from "../templates/Authentication/Authentication";
import { useSelector } from "react-redux";
import AnalyticsPage from "../templates/Analytics/AnalyticsPage";
import HomePage from "../templates/Home/HomePage";
import { isObjectEmpty } from "../utils/ObjectUtil";
import Settings from "../templates/Settings/Settings";
import ChatHistory from "../templates/ChatHistory/ChatHistory";

function AppRoutes() {
  const userProfile = useSelector((state) => state.userProfile);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        {!isObjectEmpty(userProfile.data) ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chats/history" element={<ChatHistory />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
