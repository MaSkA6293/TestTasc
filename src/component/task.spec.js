import { getTrack, isSetTrack, getCorrectValue } from "./Task";
import React from "react";
import Task from "./Task";

import { Provider } from "react-redux";
import { connect } from "react-redux";
describe("Tests functions", () => {
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

  it("test getTrack", () => {
    const track = getTrack("content[2].props.caption");
    expect(track).toEqual(["content", "2", "props", "caption"]);
  });
  describe("tests issSetTrack", () => {
    it("test isSetTrack track 'one", () => {
      const track = ["content", "2", "props", "caption"];
      const result = isSetTrack(initialState, track);
      expect(result).toEqual({
        finishValueTrack: "caption",
        isSet: true,
        typeValueOfEnd: undefined,
      });
    });
    it("test isSetTrack track 'two", () => {
      const track = ["content", "0"];
      const result = isSetTrack(initialState, track);
      expect(result).toEqual({
        finishValueTrack: "0",
        isSet: true,
        typeValueOfEnd: "panel",
      });
    });
  });

  describe("test getCorrectValue", () => {
    //finishTrack = 'width'| 'height' | 'visible' | 'caption' | 'content' | 'panel'
    //value = number|string|boolean
    //typeValueOfEnd = 'panel'|'undefined
    it("test getCorrectValue  finishTrack = width, value='200', typeValueOfEnd=undefined", () => {
      const result = getCorrectValue("width", "200");
      expect(result).toBe(200);
    });
    it("test getCorrectValue  finishTrack = height, value='200', typeValueOfEnd=undefined", () => {
      const result = getCorrectValue("height", "200");
      expect(result).toBe(200);
    });
    it("test getCorrectValue  finishTrack = visible, value='false', typeValueOfEnd=undefined", () => {
      const result = getCorrectValue("visible", "false");
      expect(result).toBe(false);
    });
    it("test getCorrectValue  finishTrack = caption, value=test2, typeValueOfEnd=undefined", () => {
      const result = getCorrectValue("caption", "test2");
      expect(result).toBe("test2");
    });
    it("test getCorrectValue  finishTrack = content, value={type: 'label', props: {caption: 'test', visible: true}}, typeValueOfEnd=undefined", () => {
      const result = getCorrectValue(
        "content",
        "{type: 'label', props: {caption: 'test', visible: true}}"
      );
      expect(result).toEqual({
        type: "label",
        props: {
          caption: "test",
          visible: true,
        },
      });
    });
    it("test getCorrectValue  finishTrack = panel, value={type: 'panel' , props: {width: 200, height: 100, visible: true}}, typeValueOfEnd=undefined", () => {
      const result = getCorrectValue(
        "0",
        "{type: 'panel' , props: {width: 200, height: 100, visible: true}}",
        "panel"
      );
      expect(result).toEqual({
        type: "panel",
        props: { width: 200, height: 100, visible: true },
      });
    });
  });
});
