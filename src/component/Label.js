import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Label extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (<span style={{ visibility: (this.props.visible) ? 'visible' : 'hidden' }}>{this.props.caption}</span>
        );
    }
}

Label.propTypes = {
    caption: PropTypes.string,
    visible: PropTypes.bool,
}

Label.defaultProps = {
    caption: 'Label element',
    visible: true,
};


export default Label;