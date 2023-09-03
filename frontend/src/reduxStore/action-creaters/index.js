
export const setCurrentUser = (CurrentUser) => {
  console.log("in SetCurrentUser action-creaters");
  return (dispatch) => {
    dispatch({
      type: "SetCurrentUser",
      payload: CurrentUser,
    });
  };
};

export const setSystemVariable = (MyContacts) => {
  return (dispatch) => {
    dispatch({
      type: "SetSystemVariable",
      payload: MyContacts,
    });
  };
};



