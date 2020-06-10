import React from "react";
import PropTypes from "prop-types";

const Button = ({ width, height, visible, caption }) => (
  <button
    style={{
      width: width + "px",
      height: height + "px",
      visibility: visible ? "visible" : "hidden",
    }}
  >
    {caption}
  </button>
);

Button.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  visible: PropTypes.bool,
  caption: PropTypes.string,
};

Button.defaultProps = {
  width: 100,
  height: 50,
  visible: true,
  caption: "Default Button",
};

export default Button;
