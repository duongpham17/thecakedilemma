import './Delete.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {TiDelete} from 'react-icons/ti';
import {IoIosArrowBack} from 'react-icons/io';
import {deleteVarietyBox} from '../../../actions/adminActions';

const Delete = (props) => {
    const [sure, setSure] = useState(false)

    const id = props.id
    const deleteVarietyBox = props.deleteVarietyBox;
    
    return (
        <div className="delete-variety">
            {sure === "sure" ? 
            <div className="ensure">
                <button onClick={() => setSure("")}><IoIosArrowBack/></button> 
                <button onClick={() => deleteVarietyBox(id)}>Sure?</button>
            </div>
            : 
            <button className="icon-delete" onClick={() => setSure("sure")}><TiDelete /></button> }
        </div>   
    )
}

export default connect(null, {deleteVarietyBox})(Delete)
