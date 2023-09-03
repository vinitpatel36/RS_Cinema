import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import AuthService from "./services/auth.service";
import Home from "./components/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatsComp.css";
import "./mainstyle.css";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./state/index1";
import { userDetailsTemplate } from "./templates/Templates";
import Login from "./components/login.component";

import HomeContext from "./context/HomeContext";



import NavBar from "./components/common/NavBar";
function App() {

  const [currentUser, setCurrentUser] = useState(userDetailsTemplate);
  const [contactId, setContactId] = useState("-1");


  const navigate = useNavigate();

  useEffect(() => {
    const localCurrentUser = AuthService.getCurrentUser();
    console.log("app.js useEffect localCurrentUser :", localCurrentUser);
    if (localCurrentUser == null) {
      navigate("/login");
    } else {
      setCurrentUser(localCurrentUser);
      navigate("/home");
    }
  }, []);



  return (
    <div className='Home'>
      <Navbar />
      {userDetail.role == SystemVariables.ROLES.STD_USER || userDetail.role == SystemVariables.ROLES.STAFF ?
        <div className='NotMyNavbar'>
          <Sidebar />
          <div className="MainComponents ">
            <Routes>
              {userDetail.isProfile && userDetail.isApproved ?
                <>
                  <Route path="/" element={<TmpCpm />} />
                  <Route path="/profile" element={<UserProfile readOnly={false} />} />
                  <Route path="/event" element={<Events />} />
                  <Route path="/addEvent" element={<AddEvents />} />
                </> : <></>}
              <Route path="/settings" element={<Setting />} />
              <Route path="/editProfile" element={<EditUserProfile />} />
              <Route path="*" element={<UserProfile readOnly={false} />} />
            </Routes>
          </div>
        </div>
        : userDetail.role == SystemVariables.ROLES.HEAD || userDetail.role == SystemVariables.ROLES.SYSTEM_COORDINATOR ?
          <div className='NotMyNavbar'>
            <AdminSidebar />
            <div className="MainComponents  dark:bg-gray-600">
              <Routes>
                {userDetail.isProfile && userDetail.isApproved ?
                  <><Route path="/" element={<TmpCpm />} />
                    <Route path="/event" element={<Events />} />
                    <Route path="/addEvent" element={<AddEvents />} />
                    <Route path="/userAccounts" element={<EditUserAccountRequest />} />
                    <Route path="/userAccounts/:id" element={<EditUserAccountRequest />} />
                    <Route path="/editUserAccess/:id" element={<EditUserAccess />} />
                    <Route path="/profile" element={<UserProfile readOnly={false} />} />
                  </> : <></>}
                <Route path="/settings" element={<Setting />} />
                <Route path="/editProfile" element={<EditUserProfile />} />
                <Route path="*" element={<UserProfile readOnly={false} />} />
              </Routes>
            </div>
          </div> : <></>
      }
    </div>
  );
}

export default App;
