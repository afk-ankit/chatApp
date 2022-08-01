export const addUserContext = (userName, email, img, uid) => {
  return {
    type: "SIGNIN",
    payload: {
      userName,
      email,
      img,
      uid,
    },
  };
};

export const removeUserContext = () => {
  return {
    type: "SIGNOUT",
    payload: {
      userName: null,
      email: null,
      img: null,
      uid: null,
    },
  };
};
