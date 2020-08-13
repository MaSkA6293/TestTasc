import contentStore from "./content";
import deepFreeze from "deep-freeze";
import { SET_NEW_VALUE, ADD_NEW_OBJECT } from "../constants";
describe("Reducer content", () => {
  const store = {
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
  describe("CHANGE_ELEMENT", () => {
    it("CHANGE_ELEMENT track=['content', '2', 'props', 'caption']", () => {
      const action = {
        type: SET_NEW_VALUE,
        payload: {
          track: ["content", "2", "props", "caption"],
          value: "test2",
        },
      };

      deepFreeze(store);
      deepFreeze(action);

      const results = contentStore(store, action);
      expect(results).toEqual({
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
              caption: "test2",
              width: 100,
              height: 50,
              visible: true,
            },
          },
        ],
      });
    });

    it("CHENGE_ELEMENT track=['content', '0', 'content', '0', 'props', 'width']", () => {
      const store = {
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
                props: { height: 100, visible: true, width: 200 },
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
        ],
      };

      const action = {
        type: SET_NEW_VALUE,
        payload: {
          track: ["content", "0", "content", "0", "props", "width"],
          value: 400,
        },
      };
      deepFreeze(store);
      deepFreeze(action);

      const results = contentStore(store, action);
      expect(results).toEqual({
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
                props: { height: 100, visible: true, width: 400 },
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
        ],
      });
    });
  });
  describe("ADD_NEW_OBJECT", () => {
    it("ADD_NEW_OBJECT in content track: ['content']", () => {
      const action = {
        type: ADD_NEW_OBJECT,
        payload: {
          track: ["content"],
          value: { type: "label", props: { caption: "test", visible: true } },
        },
      };

      deepFreeze(store);
      deepFreeze(action);

      const results = contentStore(store, action);
      expect(results).toEqual({
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
          { type: "label", props: { caption: "test", visible: true } },
        ],
      });
    });

    it("ADD_NEW_OBJECT in panel track=['content],'0']", () => {
      const action = {
        type: ADD_NEW_OBJECT,
        payload: {
          track: ["content", "0"],
          value: {
            type: "panel",
            props: { height: 100, visible: true, width: 200 },
          },
        },
      };

      deepFreeze(store);
      deepFreeze(action);

      const results = contentStore(store, action);
      expect(results).toEqual({
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
                props: { height: 100, visible: true, width: 200 },
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
      });
    });
  });
});
