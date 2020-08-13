import React, { useState, Fragment } from "react";

import { connect } from "react-redux";
import { newValue, addNewObject } from "../actions/index";
import { bindActionCreators } from "redux";

import PropTypes from "prop-types";

import "./Task.scss";
import Content from "./Content";
export const getTrack = (track) => {
  return track.replace(/(\[?)(\d+)(\]?])/g, ".$2").split(".");
};

export const isSetTrack = (obj, parts, i = 0) => {
  let keys = Object.keys(obj);
  if (keys.includes(parts[i])) {
    if (i < parts.length - 1) {
      return isSetTrack(obj[parts[i]], parts, ++i);
    } else
      return {
        isSet: true,
        typeValueOfEnd: obj[parts[i]].type,
        finishValueTrack: parts[parts.length - 1],
      };
  } else return false;
};

export const getCorrectValue = (finishTrack, value, typeValueOfEnd) => {
  if (finishTrack === "width" || finishTrack === "height") {
    return Number(value)
      ? Number(value)
      : console.log("Не корректное значение");
  } else {
    if (finishTrack === "visible") {
      return value === "false"
        ? false
        : value === "true"
        ? true
        : console.log("Не корректное значение");
    } else {
      if (finishTrack === "caption") {
        return value;
      } else if (finishTrack === "content" || typeValueOfEnd === "panel") {
        let replaceValue = value
          .replace("type", '"type"')
          .replace("props", '"props"')
          .replace("visible", '"visible"')
          .replace("width", '"width"')
          .replace("height", '"height"')
          .replace("caption", '"caption"')
          .replace(/'/g, '"');
        let regexObj = /^{+.*}+$/;
        if (regexObj.test(replaceValue)) {
          try {
            return JSON.parse(replaceValue);
          } catch (e) {
            console.log(
              "Не корректное значение в поле Новое значение",
              replaceValue
            );
            return undefined;
          }
        } else {
          console.log(
            "Не корректное значение в поле Новое значение",
            replaceValue
          );
          return;
        }
      } else {
        return undefined;
      }
    }
  }
};

const Tasc = ({ store, newValue, addNewObject }) => {
  const [inputTrack, setInputTrack] = useState("");
  const [newvalue, setNewvalue] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (newvalue.trim()) {
      const track = getTrack(inputTrack);
      const result = isSetTrack(store, track);

      if (result.isSet) {
        const { typeValueOfEnd, finishValueTrack } = result;

        const correctNewValue = getCorrectValue(
          finishValueTrack,
          newvalue,
          typeValueOfEnd
        );

        if (correctNewValue !== undefined) {
          if (typeof correctNewValue !== "object") {
            newValue(track, correctNewValue);
          } else {
            if (finishValueTrack === "content" || typeValueOfEnd === "panel") {
              addNewObject(track, correctNewValue);

              return;
            }
          }
        }
      } else {
        console.log("Не корректный пусть внутри объекта");
        return;
      }
    } else {
      console.log("Введите значение в поле Новое значение");
      return;
    }
  };

  const handleRunTest2 = () => {
    setInputTrack("content[2].props.caption");
    setNewvalue("test2");
  };
  const handleRunTest3 = () => {
    setInputTrack("content");
    setNewvalue("{type: 'label', props: {caption: 'test', visible: true}}");
  };
  const handleRunTest4 = () => {
    setInputTrack("content[0]");
    setNewvalue(
      "{type: 'panel' , props: {width: 200, height: 100, visible: true}}"
    );
  };
  const handleRunTest5 = () => {
    setInputTrack("content");
    setNewvalue(
      "{type: 'button', props: {caption: 'button test', visible: true, width:100,height:50}}"
    );
  };

  return (
    <Fragment>
      <div className="container">
        <form className="form">
          <div className="form__item">
            <label>Путь</label>
            <input
              onChange={(e) => setInputTrack(e.target.value)}
              value={inputTrack}
            />
          </div>
          <div className="form__item">
            <label>Новое значение</label>
            <input
              onChange={(e) => setNewvalue(e.target.value)}
              value={newvalue}
            />
          </div>
          <div className="form__item">
            <button onClick={handleClick}>Применить</button>
          </div>
        </form>
        <div className="out-contaner">
          <Content store={store} />
        </div>
        <div className="runTest">
          <button onClick={handleRunTest2}>Run Test 2</button>
          <button onClick={handleRunTest3}>Run Test 3</button>
          <button onClick={handleRunTest4}>Run Test 4</button>
          <button onClick={handleRunTest5}>Run Test 5</button>
        </div>
      </div>
    </Fragment>
  );
};

Tasc.propTypes = {
  store: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return { store: store.content };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      newValue,
      addNewObject,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasc);
