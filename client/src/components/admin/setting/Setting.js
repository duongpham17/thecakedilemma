import './Setting.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {updateData} from '../../../actions/adminActions';
import {AiOutlineCloudUpload} from 'react-icons/ai';

const Setting = ({home:{data}, updateData}) => {
    const [formData, setFormData] = useState({
        links: data.links,
        delivery: data.delivery,
        minimumOrder: data.minimumOrder,
    })
    const {links, delivery, minimumOrder} = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        updateData(formData, data._id)
    }

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value}) ;

    return (
        <div className="setting-container">
            {!data ? <div className="loading"/> : 
                <form onSubmit={e => onSubmit(e)}>
                    <p>Links</p>
                    <input name="links" value={links} onChange={e => onChange(e)}/>
                    <p>Delivery Cost £</p>
                    <input name="delivery" value={delivery} onChange={e => onChange(e)}/>
                    <p>Minmum Order £</p>
                    <input name="minimumOrder" value={minimumOrder} onChange={e => onChange(e)}/>
                    <br/>
                    <button><AiOutlineCloudUpload/></button>
                </form>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    home: state.homeReducers
})
export default connect(mapStateToProps, {updateData})(Setting)
