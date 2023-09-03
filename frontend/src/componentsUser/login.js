import React, { useEffect, useState, useContext } from "react";
import authService from "../services/auth.service";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { actionCreators } from "../reduxStore/index1";
import toast from 'react-hot-toast';

import "../css/login.css";

import HomeContext from "../context/HomeContext";
import { userLoginValidator } from "../validator/authValidator";

function Login() {


  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    var cred = {
      mobile: mobile,
      password: password
    };
    const { error } = userLoginValidator.validate(cred);
    console.log("validation error : ", error);
    if (error) {
      toast.error(error.toString());
      return;
    }

    const loginPromise = authService.login(cred);
    toast.promise(
      loginPromise,
      {
        loading: 'please wait while we verify you',
        success: (data) => data.message,
        error: (err) => {
          return err;
        }
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 6000,
          icon: '🔥',
        },
        error: {
          duration: 6000,
          icon: '🔥',
        },
      }
    );

    loginPromise.then((response) => {
      if (response.userProfile) {
        response.user.isProfile = true;
      } else {
        response.user.isProfile = false;
      }
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(actionCreators.setCurrentUser(response.user));
    }).catch((message) => {
      console.error(message);
      toast.error(message)
    })

  }

  return (
    <div className='login dark:bg-gray-700 flex items-center justify-center'>

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">log in to Department management system </h5>
          <div>
            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
            <input type="cel" name="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value); }} placeholder="1234567890" id="loginEmail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); }} id="loginPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <button type="button" onClick={() => { handleLogin(); }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>

        </form>
      </div>
    </div>
  );
}

export default Login;
