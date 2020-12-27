import './AddToBox.scss';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {addItemToVarietyBox} from '../../../actions/adminActions';
import {RiCake3Line, RiAddFill} from 'react-icons/ri';

const AddVariety = props => {
    const data = props.data;
    const addItemToVarietyBox = props.addItemToVarietyBox

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
    })

    const {name, price} = formData

    const onSubmit = e => {
        e.preventDefault()
        addItemToVarietyBox(data._id, formData)
        setFormData({
            name: ""
        })
    }
    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});

    return (
        <div className="add-variety-container">
            <button onClick={() => setOpen(!open)}><RiCake3Line className="icon"/></button>
            {open ? 
            <form onSubmit={e => onSubmit(e)}>
                <input type="text" placeholder="Item Name" name="name" value={name} onChange={e => onChange(e)} required />
                <input type="number" placeholder="Price *not required*" name="price" value={price} onChange={e => onChange(e)} />
                <br/>
                <button><RiAddFill className="icon"/></button>
            </form>
            : ""}
        </div>
    )
}

export default connect(null, {addItemToVarietyBox})(AddVariety)
