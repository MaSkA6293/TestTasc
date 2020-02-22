import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (<button style={{ width: this.props.width + 'px', height: this.props.height + 'px', visibility: (this.props.visible) ? 'visible' : 'hidden' }}>{this.props.caption}</button>
        );
    }
}

Button.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    visible: PropTypes.bool,
    caption: PropTypes.string,

}
Button.defaultProps = {
    width: 50,
    height: 20,
    visible: true,
    caption: 'Default Button',
};


export default Button;