import React, { useState } from 'react';
import './Task.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '../elements/list';
import { connect } from 'react-redux';
import { select } from '../actions/index';
import { bindActionCreators } from 'redux';

const Tasc = ({ select }) => {
    const [track, setTrack] = useState('');
    const [newvalue, setNewvalue] = useState('');
    const handleClick = (e) => {
        e.preventDefault();
        if (newvalue.trim()) {
            select(track, newvalue);
        }
    }

    return (
        <div className="Tasc container">
            <form>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label>Путь</label>
                        <input type="text" className="form-control" onChange={e => setTrack(e.target.value)} />
                    </div>
                    <div className="form-group col-md-5">
                        <label>Новое значение</label>
                        <input type="text" className="form-control" onChange={e => setNewvalue(e.target.value)} />
                    </div>
                    <div className="form-group col-md-2">
                        <button type="submit" id='btn' className="btn btn-link" onClick={handleClick}>Применить</button>
                    </div>
                </div>
            </form>
            <div className="deploy contaner" >
                <List />
            </div>
        </div >
    )
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
