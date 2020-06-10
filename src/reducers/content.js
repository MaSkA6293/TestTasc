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

export default function (store = initialState, action) {
  switch (action.type) {
    case "CHANGE_ELEMENT":
      return action.payload.newStore;
    default:
      return store;
  }
}
