import React from "react";
import PropTypes from "prop-types";

const Panel = ({ width, height, visible, children }) => {
  return (
    <div
      className="panel"
      style={{
        width: width + "px",
        height: height + "px",
        visibility: visible ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
};

Panel.defaultProps = {
  width: 100,
  height: 100,
  visible: true,
  children: [],
};

Panel.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.array,
};

export default Panel;
