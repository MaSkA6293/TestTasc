import React from 'react';
import Panel from './Panel';
import Label from './Label';
import Button from './Button';
import PropTypes from 'prop-types';

const Contaner = ({ matreshka, obj }) => {

    const renderPanel = (width, height, visible, index) => <Panel key={index} width={width} height={height} visible={visible} />

    const renderLabel = (caption, visible, index) => <Label key={index} caption={caption} visible={visible} />

    const renderButton = (width, height, visible, caption, index) => <Button key={index} width={width} height={height} visible={visible} caption={caption} />

    const rendermatreshka = (matreshka, childr, index) => <Contaner key={index} matreshka={matreshka} obj={childr} />;

    const getcontent = (obj) => {
        let element = obj.map((item, index) => (
            (typeof item.content === 'object') ? (rendermatreshka(item.props, item.content, index)) :
                (item.type === 'panel') && (typeof item.content === 'object') ? (rendermatreshka(item, item.content, index)) :
                    (item.type === 'panel') ? renderPanel(item.props.width, item.props.height, item.props.visible, index) :
                        (item.type === 'label') ? renderLabel(item.props.caption, item.props.visible, index) :
                            (item.type === 'button') ? renderButton(item.props.width, item.props.height, item.props.visible, item.props.caption, index) : ''
        ))
        return element;
    }

    return (
        <div>
            <Panel width={matreshka.width} height={matreshka.height} visible={matreshka.visible}>
                {getcontent(obj)}
            </Panel>
        </div >
    )
}
Contaner.propTypes = {
    matreshka: PropTypes.object.isRequired,
    obj: PropTypes.array.isRequired,
}


export default Contaner;