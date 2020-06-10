import gettrack_value from "../functions/function";

const initialState = {
  content: [
    {
      type: "panel",
      props: {
        width: 400,
        height: 200,
        visible: true,
      },
      content: [
        {
          type: "panel",
          props: {
            width: 200,
            height: 100,
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

export default function (store = initialState, action) {
  switch (action.type) {
    case "CHANGE_ELEMENT":
      //  let trackinobject = gettrack_value(store, action.payload);
      //   if (trackinobject) {
      return action.payload.newStore;

    // if (typeof trackinobject === "undefined") {
    //   return store;
    // } else {
    //   return { ...store, content: trackinobject.content };
    // }
    default:
      return store;
  }
}
