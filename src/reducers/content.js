import { SET_NEW_VALUE, ADD_NEW_OBJECT } from "../constants";
const initialState = {
  content: [
    {
      type: "panel",
      props: {
        width: 400,
        height: 200,
        visible: true,
      },
    },
    {
      type: "label",
      props: {
        caption: "test",
        visible: false,
      },
    },
    {
      type: "button",
      props: {
        caption: "button",
        width: 100,
        height: 50,
        visible: true,
      },
    },
  ],
};

const newVal = (obj, parts, value, i = 0) => {
  if (!Array.isArray(obj)) {
    const newObj = { ...obj };
    if (i < parts.length - 1) {
      let element = newObj[parts[i]];
      if (Array.isArray(element)) {
        return {
          ...newObj,
          [parts[i]]: [...newVal(element, parts, value, ++i)],
        };
      } else
        return {
          ...newObj,
          [parts[i]]: { ...newVal(element, parts, value, ++i) },
        };
    }
    return { ...newObj, [parts[i]]: value };
  } else {
    const newObj = [...obj];
    if (i < parts.length - 1) {
      let element = newObj[parts[i]];
      if (Array.isArray(element)) {
        return {
          ...newObj,
          [parts[i]]: [...newVal(element, parts, value, ++i)],
        };
      } else {
        newObj[parts[i]] = { ...newVal(element, parts, value, ++i) };
        return [...newObj];
      }
    }
  }
};

const newValAddInContent = (obj, parts, value, i = 0) => {
  if (!Array.isArray(obj)) {
    const newObj = { ...obj };
    if (i < parts.length - 1) {
      let element = newObj[parts[i]];
      if (Array.isArray(element)) {
        return {
          ...newObj,
          [parts[i]]: [...newValAddInContent(element, parts, value, ++i)],
        };
      } else
        return {
          ...newObj,
          [parts[i]]: { ...newValAddInContent(element, parts, value, ++i) },
        };
    }
    newObj[parts[i]] = [...newObj[parts[i]], value];
    return newObj;
  } else {
    const newObj = [...obj];
    if (i < parts.length - 1) {
      let element = newObj[parts[i]];
      if (Array.isArray(element)) {
        return {
          ...newObj,
          [parts[i]]: [...newValAddInContent(element, parts, value, ++i)],
        };
      } else {
        newObj[parts[i]] = {
          ...newValAddInContent(element, parts, value, ++i),
        };
        return [...newObj];
      }
    } else {
      newObj[parts[i]] = {
        ...newObj[parts[i]],
        content: newObj[parts[i]].content
          ? [...newObj[parts[i]].content, value]
          : [value],
      };

      return [...newObj];
    }
  }
};

export default function (store = initialState, action) {
  switch (action.type) {
    case SET_NEW_VALUE:
      return newVal(store, action.payload.track, action.payload.value);
    case ADD_NEW_OBJECT:
      return newValAddInContent(
        store,
        action.payload.track,
        action.payload.value
      );
    default:
      return store;
  }
}
