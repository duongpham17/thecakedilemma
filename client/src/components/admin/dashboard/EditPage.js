import './EditPage.scss';
import React, {Fragment} from 'react';

import UploadImage from './UploadImage';
import UpdateProduct from './UpdateProduct';

const EditPage = props => {
    const data = props.data
    const setOpenEditPage = props.setOpenEditPage

    const done = () => {
        setOpenEditPage(false)
    }

    return (
        <div className="edit-container">
            <button className="done-edit-btn" onClick={() => done()}>Done</button>
            {!data ? <div className="loading">Loading...</div> :
            <Fragment>
                <div className="update-content"> 
                    <UpdateProduct data={data} />
                </div>
                <div className="upload-content"> 
                    <UploadImage image={data.image} id={data._id} />
                </div>
            </Fragment>
            }
        </div>
    )
}

export default EditPage
