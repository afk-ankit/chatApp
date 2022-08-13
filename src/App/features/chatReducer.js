export const initialState = {};
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD__CHAT":
      return {
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
