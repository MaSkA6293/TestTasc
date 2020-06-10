import React from "react";
import PropTypes from "prop-types";

const Label = ({ visible, caption }) => (
  <span style={{ visibility: visible ? "visible" : "hidden" }}>{caption}</span>
);

Label.defaultProps = {
  caption: "default label",
  visible: true,
};

Label.propTypes = {
  caption: PropTypes.string,
  visible: PropTypes.bool,
};

export default Label;
