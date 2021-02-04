import React, {useState} from 'react';
import {ImBin} from 'react-icons/im';

const Delete = (props) => {
    const deleteOrder = props.deleteOrder

    const [id, setId] = useState("");
    const [done, setDone] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        setId("");
        deleteOrder(id);
        setDone("awaiting");
        setTimeout(() => {setDone(false)}, 2000);
    }

    return (
        <div className="delete-order-container">
        {done === "awaiting" ? <div className="loading-order-delete" /> :
            <form onSubmit={(e) => onSubmit(e)}>
                <input placeholder="Order ID" type="text" onChange={(e) => setId(e.target.value)} />
                <button><ImBin/></button> 
            </form>
        }
        </div>
    )
}

export default Delete
