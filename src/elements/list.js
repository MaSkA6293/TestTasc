import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { select } from '../actions/index';
import Panel from './Panel';
import Label from './Label';
import Button from './Button';
import Contaner from './contaner';
import PropTypes from 'prop-types';

const List = ({ content }) => {
    const renderPanel = (width, height, visible, index) => <Panel key={index} width={width} height={height} visible={visible} />

    const renderLabel = (caption, visible, index) => <Label key={index} caption={caption} visible={visible} />

    const renderButton = (width, height, visible, caption, index) => <Button key={index} width={width} height={height} visible={visible} caption={caption} />

    const rendermatreshka = (matreshka, childr, index) => <Contaner key={index} matreshka={matreshka} obj={childr} />

    const getcontent = (obj) => {
        let element = obj.map((item, index) => (
            (item.type === 'panel') && (typeof item.content === 'object') ? (rendermatreshka(item.props, item.content, index)) :
                (item.type === 'panel') ? renderPanel(item.props.width, item.props.height, item.props.visible, index) :
                    (item.type === 'label') ? renderLabel(item.props.caption, item.props.visible, index) :
                        (item.type === 'button') ? renderButton(item.props.width, item.props.height, item.props.visible, item.props.caption, index) : ''
        ))
        return element;
    };

    return <div>{getcontent(content)}</div >
}

function mapStateToProps(state) {
    return {
        content: state.content.content,
    }
}

const mathDispathToProps = (dispatch) => bindActionCreators({ select: select }, dispatch)

List.propTypes = {
    content: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mathDispathToProps)(List);