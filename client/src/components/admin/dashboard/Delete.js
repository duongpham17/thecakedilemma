import './Delete.scss';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../firebase';

import {FaTrash} from 'react-icons/fa';
import {IoIosArrowForward} from 'react-icons/io';

import {deleteProduct} from '../../../actions/adminActions';

const Delete = props => {
    const image = props.image;
    const id = props.id;
    const deleteProduct = props.deleteProduct;
    const [sure, setSure] = useState("")

    const deleteImageUrlFromFirebase = () => {
        if(sure === "sure" ){
            let i;
            for(i = 0; i < image.length; i++){
                const desertRef = storage.refFromURL(image[i].url)
                desertRef.delete()
            }
            if(i === image.length){
                deleteProduct(id)
                setSure("")
            }
        } 
    }

    return (
        <div className="delete-product">
            {sure === "sure" ? 
            <div className="ensure">
                <button onClick={() => deleteImageUrlFromFirebase()}>Sure?</button>
                <button onClick={() => setSure("")}><IoIosArrowForward className="icon"/></button> 
            </div>
            : 
            <button className="icon-delete" onClick={() => setSure("sure")}><FaTrash /></button> }
        </div>   
    )
}

export default connect(null, {deleteProduct})(Delete)
