import React, { Component } from 'react';
import Panel from '../component/Panel';
import Label from '../component/Label';
import Button from '../component/Button';


class Contaner extends Component {
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


    rendermatreshka = (matreshka, childr, index) => {
        console.log(matreshka);
        console.log(childr);
        return <Contaner key={index} matreshka={matreshka} obj={childr} />;

    }
    getcontent = (obj) => {
        //console.log(obj);
        let element = obj.map((item, index) => (
            (typeof item.content === 'object') ? (this.rendermatreshka(item.props, item.content, index)) :
                (item.type === 'Panel') && (typeof item.content === 'object') ? (this.rendermatreshka(item, item.content, index)) :
                    (item.type === 'Panel') ? this.renderPanel(item.props.width, item.props.height, item.props.visible, index) :
                        (item.type === 'Label') ? this.renderLabel(item.props.caption, item.props.visible, index) :
                            (item.type === 'Button') ? this.renderButton(item.props.width, item.props.height, item.props.visible, item.props.caption, index) : ''


        ))

        return element;
    };

    render() {

        return (<div>
            <Panel width={this.props.matreshka.width} height={this.props.matreshka.height} visible={this.props.matreshka.visible}>
                {this.getcontent(this.props.obj)}

            </Panel>




        </div >
        )
    }
}


Contaner.defaultProps = {
    Panel: '',
    Label: '',
    Button: '',
};


export default Contaner;