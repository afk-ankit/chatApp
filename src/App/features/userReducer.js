export const initialState = {
  userName: null,
  email: null,
  img: null,
  uid: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        userName: action.payload.userName,
        email: action.payload.email,
        img: action.payload.img,
        uid: action.payload.uid,
      };
    case "SIGNOUT":
      return {
        ...state,
        userName: null,
        email: null,
        img: null,
        uid: null,
      };
    default:
      return {
        ...state,
      };
  }
};
