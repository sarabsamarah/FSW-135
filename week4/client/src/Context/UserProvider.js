import React, { useState } from "react";
import axios from "axios";
export const UserContext = React.createContext();
const userAxios = axios.create();
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default function UserProvider(props) {
  const initialState = { 
      user: JSON.parse(localStorage.getItem('user')) || {}, 
      token: localStorage.getItem('token') || '', 
      issues: JSON.parse(localStorage.getItem('issues')) || [],
      allIssues: JSON.parse(localStorage.getItem('allIssues')) || []
  }
  const [userState, setUserState] = useState(initialState);

  function signUp(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function logIn(credentials) {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getUserIssues();
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
    rIssues: [],
    });
  }

  function getUserIssues() {
    userAxios
      .get("/api/issue/user")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
        rIssues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addUser(newUser) {
    userAxios
      .post("/api/user", newUser)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
        rIssues: [ res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  return (
    <UserContext.Provider
      value={{ ...userState, signUp, logIn, logout, addUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
