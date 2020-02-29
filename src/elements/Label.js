import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ visible, caption }) => <span style={{ visibility: visible ? 'visible' : 'hidden' }}>{caption}</span>

Label.propTypes = {
    caption: PropTypes.string,
    visible: PropTypes.bool,
}

Label.defaultProps = {
    caption: 'Label element default',
    visible: true,
};

export default Label;