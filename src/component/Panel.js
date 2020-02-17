import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Panel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            border: '3px solid black',
        }
    }
    render() {
        return (<div style={{ border: this.state.border, width: this.props.width + 'px', height: this.props.height + 'px', visibility: (this.props.visible) ? 'visible' : 'hidden' }}> {this.props.children}
        </div>
        );
    }
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