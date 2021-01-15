import './Order.scss';
import React, {useState} from 'react';
import {GoPrimitiveDot} from 'react-icons/go';

const Complete = props => {
    const completeOrder = props.completeOrder;
    const el = props.el;

    const [click, setClick] = useState(false)
    const complete = (e, id, method) => {
        e.preventDefault()
        completeOrder(id, method)
        setClick(true)
        setTimeout(() => {setClick(false)}, 2000)
    }

    return (
        <li>
            {click ? <p className="loading_3" /> :
            <button onClick={(e) => el.status === "Completed" ? "" : complete(e, el._id, el.method)}><GoPrimitiveDot className={`icon ${el.status === "Processing" ? "processing-icon" : "completed-icon" }`}/>{el.status}</button> 
            }
        </li>
    )
}

export default Complete
