import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AddchartIcon from "@mui/icons-material/Addchart";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import LogoutIcon from "@mui/icons-material/Logout";

export const COMPANION_TYPE = {
  MALE: 'Male',
  FEMALE: 'Female'
}
export const VOICES = [
  { key: 0, name: "Michael", companionType: "Male" },
  { key: 1, name: "David", companionType: "Male" },
  { key: 2, name: "Charlotte", companionType: "Female" },
  { key: 87, name: "Daisy", companionType: "Female" },
];

export const NAV_PANEL = [
  {
    title: "Dashboard",
    tooltip: "Dashboards",
    icon: <DashboardIcon />,
    path: "/home",
  },
  {
    title: "Analytics",
    tooltip: "Analytics",
    icon: <AddchartIcon />,
    path: "/analytics",
  },
  {
    title: "Chat History",
    tooltip: "Chat History",
    icon: <VoiceChatIcon />,
    path: "/chats/history",
  },
  {
    title: "Settings",
    tooltip: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    title: "Logout",
    tooltip: "Logout",
    icon: <LogoutIcon />,
  },
];

export const GREET_MESSAGES = [
  "Hello, user_name, I'm companion_name, and it's a pleasure to see you today. How can I be of service?",
  "Welcome, user_name. I'm companion_name, Let's discuss how I can support you today?",
  "Hello and welcome, user_name. I'm companion_name, and I'm pleased to meet you. How can I assist you, today?",
  "Good day, user_name. I'm companion_name, and I'm here to ensure you receive excellent care. What concerns would you like to discuss?",
  "It's a pleasure to have you here, user_name. I'm companion_name, and I'm here to provide you with the best care possible. Is there anything specific on your mind that you'd like to discuss?",
];

export const ROLES = {
  SYSTEM: "system",
  ASSISTANT: "assistant",
  USER: "user",
};

export const SYSTEM_PROMPT = `Act as a CBT therapist to engage in a supportive conversation with the user. During the interaction, ask open-ended questions to understand the situation better and make sure to respond in a compassionate and non-judgmental manner in not more thn 40 words. The goal is to provide understanding, empathy, and guidance through the principles of CBT and create a comfortable space for the user to express their feelings, concerns, and challenges.`;
