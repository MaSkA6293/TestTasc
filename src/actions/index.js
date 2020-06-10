export const select = (newStore) => {
  return {
    type: "CHANGE_ELEMENT",
    payload: {
      newStore,
    },
  };
};
