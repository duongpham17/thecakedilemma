import './Create.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createVarietyBox} from '../../../actions/adminActions';

const CreateVariety = (props) => {

    const createVarietyBox = props.createVarietyBox

    const [formData, setFormData] = useState({
        title: ""
    })

    const onSubmit = (e) => {
        e.preventDefault()
        createVarietyBox(formData)
    }

    return (
        <div className="create-variety-container">
            <form onSubmit={e => onSubmit(e)}>
                <input type="text" placeholder="Variety Box Title" onChange={e => setFormData({title: e.target.value})} required  />
                {formData.title.length >= 3 ? 
                <button>create</button>
                : ""}
            </form> 
        </div>
    )
}

export default connect(null, {createVarietyBox})(CreateVariety)
