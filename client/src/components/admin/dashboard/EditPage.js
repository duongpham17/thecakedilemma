import './EditPage.scss';
import React, {Fragment} from 'react';

import UploadImage from './UploadImage';
import UpdateProduct from './UpdateProduct';

const EditPage = props => {
    const edit = props.edit;
    const data = props.data;
    const setOpenEditPage = props.setOpenEditPage

    const done = () => {
        setOpenEditPage(false)
    }

    return (
        <div className="edit-container">
            <button className="done-edit-btn" onClick={() => done()}>Done</button>
            {!edit ? <div className="loading"/> :
            <Fragment>
                <div className="update-content"> 
                    <UpdateProduct edit={edit} data={data} />
                </div>
                <div className="upload-content"> 
                    <UploadImage image={edit.image} id={edit._id} />
                </div>
            </Fragment>
            }
            <button className="done-edit-btn" onClick={() => done()}>Done</button>
        </div>
    )
}

export default EditPage
