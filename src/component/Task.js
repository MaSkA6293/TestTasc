import React, { Component } from 'react';
import './Task.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '../elements/list';
import { connect } from 'react-redux';
import { select } from '../actions/index';
import { bindActionCreators } from 'redux';

class Tasc extends Component {
    state = {
        track: '',
        newvalue: '',
    };
    handletrack = (e) => {
        this.setState({ track: e.target.value });
    };
    handlevalue = (e) => {
        this.setState({ newvalue: e.target.value });
    };
    handleClick = (e) => {
        e.preventDefault();
        const { track, newvalue } = this.state;
        this.props.select(track, newvalue);
    };
    render() {
        return (
            <div className="Tasc container">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label>Путь</label>
                            <input type="text" className="form-control" onChange={this.handletrack} />
                        </div>
                        <div className="form-group col-md-5">
                            <label>Новое значение</label>
                            <input type="text" className="form-control" onChange={this.handlevalue} />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="submit" id='btn' className="btn btn-link" onClick={this.handleClick.bind(this)}>Применить</button>
                        </div>
                    </div>
                </form>
                <div className="deploy contaner" >
                    <List />
                </div>
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {
        content: state.content.content
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        select: select
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Tasc);
