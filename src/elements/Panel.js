import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ width, height, visible, children }) => {

    return (<div style={{ border: '3px solid black', width: width + 'px', height: height + 'px', visibility: visible ? 'visible' : 'hidden' }}> {children}
    </div>
    )
}

Panel.defaultProps = {
    width: 100,
    height: 100,
    visible: true,
    children: '',
};

Panel.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    visible: PropTypes.bool,
    children: PropTypes.any,
}

export default Panel;