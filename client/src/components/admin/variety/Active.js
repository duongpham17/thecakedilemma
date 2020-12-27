import './Active.scss';
import React from 'react';
import { connect } from 'react-redux';
import { BsCircleFill } from 'react-icons/bs';
import { setVarietyToActive } from '../../../actions/adminActions';

const Active = props => {
    const id = props.id;
    const setVarietyToActive = props.setVarietyToActive;
    const boolean = props.boolean;

    return (
        <div className="active-container">
            <button onClick={() => setVarietyToActive(id, boolean ? false : true) }><BsCircleFill className={boolean ? "icon-active" : "icon-not-active"}/></button>
        </div>
    )
}

export default connect(null, { setVarietyToActive } )(Active)
