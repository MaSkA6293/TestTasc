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
        return (<div style={{ border: this.state.border, width: this.props.width + 'px', height: this.props.height + 'px', visibility: (this.props.visible) ? 'visible' : 'hidden' }}></div>
        );
    }
}
Panel.defaultProps = {
    width: 10,
    height: 10,
    visible: true,
};

Panel.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    visible: PropTypes.bool,

}


export default Panel;