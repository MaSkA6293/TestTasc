import { SET_NEW_VALUE, ADD_NEW_OBJECT } from "../constants";

export const newValue = (track, correctNewValue) => {
  return {
    type: SET_NEW_VALUE,
    payload: {
      track,
      value: correctNewValue,
    },
  };
};

export const addNewObject = (track, correctNewValue) => {
  return {
    type: ADD_NEW_OBJECT,
    payload: {
      track,
      value: correctNewValue,
    },
  };
};
