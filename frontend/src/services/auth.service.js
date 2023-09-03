
import { handleRejectResponse } from "./systemService"

class AuthService {

  login(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        credentials: "include",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(credential),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/login", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register arrive : ", res);
          handleRejectResponse(res.message);
          if (res.success) {
            resolve(res);
          } else {
            reject(res.message);
          }
        })
        .catch((e) => {
          console.log("error : ", e);
          reject(e);
        });
    });
  }


  logout() {
    localStorage.removeItem("user");
    localStorage.clear();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getCurrentUserId() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      return currentUser._id;
    }
    return null;
  }
  getUserToken() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return currentUser.token;
  }
}
export default new AuthService();
