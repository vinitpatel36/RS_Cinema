export const SetCurrentUserReducer = (state = {}, action) => {
  if (action.type == "SetCurrentUser") {

    console.log("SetCurrentUser reducer call inside if ");
    return action.payload;
  } else {
    return state;
  }
};
export const SetSystemVariableReducer = (state = systemVariablesTemplate, action) => {
  if (action.type == "SetSystemVariable") {

    console.log("SetSystemVariable reducer call inside if ");
    return action.payload;
  } else {
    return state;
  }
};

export const systemVariablesTemplate = {
  ROLES: {
    ADMIN: 'admin',
    CANTEEN_USER: 'canteen_user',
    NORMAL_USER: 'normal_user',
  },
  UNITS: {
    NOS: "nos",
    KG: "kg",
    LITRE: "litre"
  }
}

export const userProfileTemplate = {
  userId: "",
  firstName: "",
  lastName: "",
  personalDetails: {
    mobileNo: "",
    employeeId: "",
    aadharNumber: 0,
    panNumber: "",
    dateOfBirth: new Date(),
  },
  bankDetails: {
    accNumber: 0,
    bankName: "",
    branch: "",
    IFSC_code: "",
  },
  designation: "",
  address: {
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  experience: 0,
  joiningDate: new Date(),
  __v: 0,
  profileImage: ""
};

