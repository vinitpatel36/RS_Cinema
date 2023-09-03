import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Dashboard from "../componentsUser/Dashboard";
import Sidebar from "../componentsUser/Sidebar"
import TmpCpm from "./TmpCpm"
import Setting from "./Setting"
import AdminSidebar from "../adminComponents/Sidebar"
import Product from "../adminComponents/Product";
import AddProduct from "../adminComponents/AddProduct";
import AllCanteens from "../adminComponents/section/AllCanteens"

function App() {

  const SystemVariables = useSelector((state) => state.SystemVariables);
  const currentUser = useSelector((state) => state.CurrentUser);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("role in Home : ", currentUser);
  })

  return (<>

    <div className='Home'>
      <Navbar />
      {currentUser.role == SystemVariables.ROLES.CANTEEN_USER ?
        <div className='NotMyNavbar'>
          <Sidebar />
          <div className="MainComponents ">
            <Routes>
              <Route path="/" element={<TmpCpm />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="*" element={<div>404 error</div>} />
            </Routes>
          </div>
        </div>
        : currentUser.role == SystemVariables.ROLES.ADMIN ?
          <div className='NotMyNavbar'>
            <AdminSidebar />
            <div className="MainComponents  dark:bg-gray-600">
              <Routes>
                <Route path="/" element={<TmpCpm />} />
                <Route path="/canteens" element={<AllCanteens />} />
                <Route path="/products" element={<Product />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/addProduct/:id" element={<AddProduct />} />
                {/* <Route path="/userAccounts" element={<EditUserAccountRequest />} /> */}
                {/* <Route path="/userAccounts/:id" element={<EditUserAccountRequest />} /> */}
                {/* <Route path="/editUserAccess/:id" element={<EditUserAccess />} /> */}
                {/* <Route path="/profile" element={<UserProfile readOnly={false} />} /> */}
                <Route path="/settings" element={<Setting />} />
                <Route path="*" element={<div>404 error</div>} />
              </Routes>
            </div>
          </div> : <></>
      }
    </div>
  </>
  );
}

export default App;
