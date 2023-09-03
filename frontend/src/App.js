import React, { useState, useEffect } from "react";

import Home from "./common/Home";

import toast, { Toaster } from 'react-hot-toast';

import { userDetailsTemplate } from "./templates/Templates";
import Login from "./componentsUser/login";

import userService from "./services/userService";
import authService from "./services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./reduxStore/index1";
import { useNavigate } from "react-router-dom";


function App() {

  const SystemVariables = useSelector((state) => state.SystemVariables);
  const currentUser = useSelector((state) => state.CurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("");


  useEffect(() => {
    console.log("SystemVariables : ", SystemVariables);
  }, [SystemVariables]);

  useEffect(() => {
    console.log("Current user changed : ", currentUser);
    setRole(currentUser.role);
    if (Object.values(SystemVariables.ROLES).includes(currentUser.role)) {
      userService.getAllVariables().then((res) => {
        console.log(res.variables);
        dispatch(actionCreators.setSystemVariable(res.variables));
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [currentUser])

  useEffect(() => {
    const preferTheme = userService.getUserPreferTheme();
    if (preferTheme == "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  useEffect(() => {
    const localCurrentUser = authService.getCurrentUser();
    console.log("app.js useEffect localCurrentUser :", localCurrentUser);
    if (localCurrentUser == null) {
      navigate("/login");
    } else {
      dispatch(actionCreators.setCurrentUser(localCurrentUser));
      navigate("/");
    }
  }, []);

  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      {Object.values(SystemVariables.ROLES).includes(role) ? <Home /> : <Login />}
    </>
  );
}

export default App;

