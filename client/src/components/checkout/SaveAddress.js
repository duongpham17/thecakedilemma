import './SaveAddress.scss';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {addAddress, removeAddress} from '../../actions/userActions';
import {RiDeleteBin6Line, RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri';

export const SaveAddress = (props) => {
    const user = props.user.user;
    const loggedOn = props.auth.loggedOn ;
    const addAddress = props.addAddress;
    const removeAddress = props.removeAddress;
    const orderData = props.orderData;
    const setOrderData = props.setOrderData;
    const addressDone = props.addressDone;

    const [openAddAddress, setOpenAddAddress] = useState(false);
    const [addAddressData, setAddAddressData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
    })
    const {first_name, last_name, address_1, address_2, city, postcode, email} = addAddressData

    const onChange = e => setAddAddressData({...addAddressData, [e.target.name] : e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        addAddress(addAddressData)
        setAddAddressData({first_name: "", last_name: "", email: "", address_1: "", address_2: "", city: "", postcode: ""})
    }
    
    const addressFill = (index) => {
        const u = user.address[index]
        setOrderData({...orderData,
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            address_1: u.address_1,
            address_2: u.address_2,
            city: u.city,
            postcode: u.postcode
        })
    }

    return (
        <Fragment>
            {!addressDone ? 
            <Fragment>
            {loggedOn ? 
            <div className="save-address-content">
                <div className="open-address">
                    <button onClick={() => setOpenAddAddress(!openAddAddress)}>{openAddAddress ? <h3>Close Edit <RiArrowLeftSLine className="icon" /></h3> : <h2>Edit or Save Address <RiArrowRightSLine className="icon" /> </h2> }</button>
                </div>

                <div className="showing-saved-address">
                    {!user ? "" : user.address.map((el, index) => 
                    <div className="quick-address" key={el._id}>
                        {openAddAddress ? 
                        <button className="bin-btn" onClick={() => removeAddress(el._id)}>{el.first_name} <RiDeleteBin6Line className="icon"/></button>
                        : 
                        <button className="quick-btn" onClick={() => addressFill(index)}>{el.first_name}</button>
                        }
                    </div>
                    )}
                </div>

                {openAddAddress ? 
                <form onSubmit={e => onSubmit(e)}>
                    <p>First Name</p>
                    <input type="text"  name="first_name" value={first_name} onChange={e => onChange(e)} maxLength="30" minLength="3" required />
                    <p>Last Name</p>
                    <input type="text"  name="last_name" value={last_name} onChange={e => onChange(e)} maxLength="30" minLength="2" required />
                    <p>Email</p>
                    <input type="email" name="email" value={email} onChange={e => onChange(e)} maxLength="100" minLength="2" required />
                    <p>Address</p>
                    <input type="text"  name="address_1" value={address_1} onChange={e => onChange(e)} maxLength="100" minLength="4" required/>
                    <p>Address 2 (optional)</p>
                    <input type="text"  name="address_2" value={address_2} onChange={e => onChange(e)} maxLength="100" minLength="4" />
                    <p>City</p>
                    <input type="text"  name="city" value={city} onChange={e => onChange(e)} maxLength="100" minLength="4" required/>
                    <p>Postcode</p>
                    <input type="text"  name="postcode" value={postcode} onChange={e => onChange(e)} maxLength="20" minLength="4" required/>
                    <br/>
                    <button>Save</button>
                </form>
                : ""}
            </div>
            : "" }
            </Fragment>
            : ""}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers,
    auth: state.authReducers
})


export default connect(mapStateToProps, {addAddress, removeAddress})(SaveAddress)
