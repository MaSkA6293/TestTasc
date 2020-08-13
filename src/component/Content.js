import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Panel from "./Panel";
import Label from "./Label";
import Button from "./Button";

const Content = ({ store }) => {
  const renderPanel = (width, height, visible, index, children) => {
    if (!children) {
      return (
        <Panel key={index} width={width} height={height} visible={visible} />
      );
    } else {
      return (
        <Panel
          key={index}
          width={width}
          height={height}
          visible={visible}
          children={getContent(children)}
        />
      );
    }
  };

  const renderLabel = (caption, visible, index) => (
    <Label key={index} caption={caption} visible={visible} />
  );

  const renderButton = (width, height, visible, caption, index) => (
    <Button
      key={index}
      width={width}
      height={height}
      visible={visible}
      caption={caption}
    />
  );

  const getContent = (content) => {
    return content.map((item, index) => {
      if (item.type === "panel") {
        return renderPanel(
          item.props.width,
          item.props.height,
          item.props.visible,
          index,
          item.content
        );
      }
      if (item.type === "label") {
        return renderLabel(item.props.caption, item.props.visible, index);
      }
      if (item.type === "button") {
        return renderButton(
          item.props.width,
          item.props.height,
          item.props.visible,
          item.props.caption,
          index
        );
      } else {
        return console.log("Ошибка render. item.type не определен");
      }
    });
  };

  return <Fragment> {getContent(store.content)}</Fragment>;
};

const mathDispathToProps = (dispatch) => bindActionCreators(dispatch);

Content.propTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(mathDispathToProps)(Content);
