import './Dashboard.scss';
import React, { useState, useEffect, Fragment } from 'react';
import {connect} from 'react-redux';
import {getAdminProducts, getProductToEdit} from '../../../actions/adminActions';
import {date} from '../../../functions/functions';
import {AiFillEdit} from 'react-icons/ai';

import Delete from './Delete';
import Activate from './Activate';
import EditPage from './EditPage';
import Gallery from './Gallery';

export const Dashboard = ({admin:{products, edit, loading}, getProductToEdit, getAdminProducts}) => {

    const [openEditPage, setOpenEditPage] = useState(false)

    useEffect(() => {
        if(!products){
            getAdminProducts()
        }
    }, [getAdminProducts, products])

    const editProduct = (e, id) => {
        if(!edit || edit._id !== id){
        e.preventDefault()
        setOpenEditPage(true)
        getProductToEdit(id)
        } else {
            setOpenEditPage(true)
        }
    }

    return (
        <Fragment>
        {openEditPage ? 
            <div className="dashboard-edit-container">
                {!edit ? "" : 
                    <EditPage data={edit} setOpenEditPage={setOpenEditPage} />
                }
            </div>
        : ""} 

        <div className="dashboard-main-container">
            {loading ? <div className="loading" /> : ""}

            {!products ? "" : 
            <Fragment>
            {products.map((el, index) => 
            <div key={el._id} className="card">
                <div className="navbar-content">
                    <Activate id={el._id} boolean={el.active}  />
                    <button onClick={(e) => editProduct(e, el._id)}><AiFillEdit className="icon"/></button>
                    <p>{date(el.createdAt)}</p>
                    <Delete id={el._id} image={el.image} />
                </div>

                <div className="image-content">
                    <Gallery data={products[index].image} />
                </div>

                <div className="information-content">
                    <p>Sold: {el.sold}</p>
                    <p>Total: £{el.total}</p>
                    <br/><br/>
                    <p>Type: {el.type}</p>
                    <br/><br/>
                    <p>{el.price}</p>
                    <p>Stock: {el.quantity}</p>
                    <br/><br/>
                    <p>{el.title}</p>
                </div>
            </div>
            )}
            </Fragment>
            }
        </div>

        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {getAdminProducts, getProductToEdit})(Dashboard)
