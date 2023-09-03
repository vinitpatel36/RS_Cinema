
import { handleRejectResponse } from "./systemService"

class UserService {

    removeProductDetails(id) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ _id: id })
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/product/removeProduct", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    updateProductDetails(data) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify(data)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/product/updateProducts", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getProductDetails(id) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ _id: id })
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/product/getProduct", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getAllProducts() {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/product/getAllProducts", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getAllVariables() {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/system/getAllVariables", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getUserPreferTheme() {
        const localData = localStorage.getItem("getUserPreferTheme");
        if (localData == null) {
            return "white";
        }
        return JSON.parse(localData);
    }
    saveUserPreferTheme(themeName) {
        localStorage.setItem("getUserPreferTheme", JSON.stringify(themeName));
    }
}

export default new UserService();
