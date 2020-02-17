import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { select } from '../actions/index';
import './list.css';
import Panel from '../component/Panel';
import Label from '../component/Label';
import Button from '../component/Button';


class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    };

    renderPanel = (width, height, visible, index) => {
        return <Panel key={index} width={width} height={height} visible={visible} />
    }
    renderLabel = (caption, visible, index) => {

        return <Label key={index} caption={caption} visible={visible} />
    }
    renderButton = (width, height, visible, caption, index) => {

        return <Button key={index} width={width} height={height} visible={visible} caption={caption} />
    }

    getcontent = (obj) => {
        let element = obj.map((item, index) => (
            (item.type === 'Panel') ? this.renderPanel(item.props.width, item.props.height, item.props.visible, index) :
                (item.type === 'Label') ? this.renderLabel(item.props.caption, item.props.visible, index) :
                    (item.type === 'Button') ? this.renderButton(item.props.width, item.props.height, item.props.visible, item.props.caption, index) : ''
        ))

        return element;
    };
    render() {

        return (<div>

            {this.getcontent(this.props.content)}
        </div >
        )
    }
}



function mapStateToProps(state) {
    return {
        content: state.content,
        users: state.users
    }
}

function mathDispathToProps(dispatch) {
    return bindActionCreators({
        select: select
    }, dispatch)
}

export default connect(mapStateToProps, mathDispathToProps)(List);