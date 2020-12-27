import './BoxContent.scss';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {TiDelete} from 'react-icons/ti';
import {updateItemInVarietyBox, deleteItemInVarietyBox} from '../../../actions/adminActions';

const BoxContent = props => {

    const data = props.data;
    const updateItemInVarietyBox = props.updateItemInVarietyBox;
    const deleteItemInVarietyBox = props.deleteItemInVarietyBox;

   const [nameData, setNameData] = useState([])
   const [priceData, setPriceData] = useState([])
   const [arrayData, setArrayData] = useState([])

   useEffect(() => {
       setNameData(data.variety.length === 0 ? "" :  data.variety.map(el => el.name ))
       setPriceData(data.variety.length === 0 ? "" : data.variety.map(el => el.price === null ? 0 : el.price ))
       setArrayData(data.variety.length === 0 ? "" : data.variety.map(el => el._id ))
   }, [data, setNameData])

    const onSubmit = e => {
        e.preventDefault()
        updateItemInVarietyBox(data._id, nameData, priceData, arrayData)
    }

    const onChange = (e, index, dataSet) => {
        const name = e.target.value
        dataSet(current => current.map((current_name, i) => i === index ? name : current_name))
    }

    return (
        <div className="get-update-delete-variety-container">
            <form onSubmit={e => onSubmit(e)}>
                <table>
                    <tbody>
                        <tr>

                            <td>
                            {arrayData.length === 0 ? "" : arrayData.map((el, index) =>
                                <button key={index} type="button" onClick={() => deleteItemInVarietyBox(data._id, el._id)}><TiDelete/></button>
                            )}
                            </td>
                            <td>
                            {nameData.length === 0 ? "" : nameData.map((el, index) => 
                                <input key={index} type="text" value={el} onChange={e => onChange(e, index, setNameData)}/>
                            )}
                            </td>
                            <td>
                            {priceData.length === 0 ? "" : priceData.map((el, index) => 
                                <input key={index} type="number" value={el} onChange={e => onChange(e, index, setPriceData)}/>
                            )}
                            </td>

                        </tr>
                    </tbody>
                </table>

                <br/>
                    {arrayData.length === 0 ? "" : 
                    <button className="save">save</button>
                    }
            </form>
        </div>
    )
}

export default connect(null, {updateItemInVarietyBox, deleteItemInVarietyBox})(BoxContent)
