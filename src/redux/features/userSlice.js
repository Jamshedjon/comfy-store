import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const user = { ...payload.user, token: payload.jwt };
      if (Object.keys(user).length !== 0) {
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
      } else {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.clear();
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
