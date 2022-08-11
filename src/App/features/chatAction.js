export const addChat = (item) => {
  return {
    type: "ADD__CHAT",
    payload: {
      ...item,
    },
  };
};
