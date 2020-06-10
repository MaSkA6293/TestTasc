import React, { useState } from "react";

import { connect } from "react-redux";
import { select } from "../actions/index";
import { bindActionCreators } from "redux";

import PropTypes from "prop-types";

import "./Task.scss";
import Content from "./Content";

const Tasc = ({ select, store }) => {
  const [track, setTrack] = useState("");
  const [newvalue, setNewvalue] = useState("");

  const ifTrack = (obj, parts, i) => {
    let keys = Object.keys(obj);
    if (keys.includes(parts[i])) {
      if (i < parts.length - 1) {
        return ifTrack(obj[parts[i]], parts, ++i);
      } else
        return {
          isSet: true,
          //   valueOfpatrtsEnd: obj[parts[i]],
          typeValueOfEnd: obj[parts[i]].type,
        }; // typeValueOfEnd : typeof obj[parts[i]]
    } else {
      return false;
    }
  };

  const getIfIssetTrack = (obj, track) => {
    const parts = track.replace(/(\[?)(\d+)(\]?])/g, ".$2").split(".");
    return {
      obj: ifTrack(obj, parts, 0),
      parts: parts,
    };
  };

  const newVal = (obj, parts, value, i) => {
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
      //    newObj[parts[i]] = [...newObj[parts[i]], value];
      //  return newObj;
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

  const newValAddInContent = (obj, parts, value, i) => {
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

  const getCorrectValue = (finishTrack, value, typeValueOfEnd) => {
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
          let k = value;
          k = k.replace("type", '"type"');
          k = k.replace("props", '"props"');
          k = k.replace("visible", '"visible"');
          k = k.replace("width", '"width"');
          k = k.replace("height", '"height"');
          k = k.replace("caption", '"caption"');
          const regex1 = /'/g;
          k = k.replace(regex1, '"');

          // Переменная для контроля корректности данных
          try {
            let strtoJSON = JSON.parse(k);

            return strtoJSON;
          } catch (e) {
            console.log("Не корректное значение в поле Новое значение", k);
            return undefined;
          }
        } else {
          return undefined;
        }
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (newvalue.trim()) {
      const result = getIfIssetTrack(store, track);
      if (result.obj.isSet) {
        const { typeValueOfEnd } = result.obj;

        const finishValueTrack = result.parts[result.parts.length - 1];

        const correctNewValue = getCorrectValue(
          finishValueTrack,
          newvalue,
          typeValueOfEnd
        );

        if (correctNewValue !== undefined) {
          if (typeof correctNewValue !== "object") {
            const newStore = newVal(store, result.parts, correctNewValue, 0);
            select(newStore);
          } else {
            if (finishValueTrack === "content" || typeValueOfEnd === "panel") {
              const newStore = newValAddInContent(
                store,
                result.parts,
                correctNewValue,
                0
              );
              select(newStore);
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

  return (
    <div className="container">
      <form className="form">
        <div className="form__item">
          <label>Путь</label>
          <input onChange={(e) => setTrack(e.target.value)} />
        </div>
        <div className="form__item">
          <label>Новое значение</label>
          <input onChange={(e) => setNewvalue(e.target.value)} />
        </div>
        <div className="form__item">
          <button onClick={handleClick}>Применить</button>
        </div>
      </form>
      <div className="out-contaner">
        <Content store={store} />
      </div>
    </div>
  );
};

Tasc.propTypes = {
  store: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return { store: store.content };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      select,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasc);
