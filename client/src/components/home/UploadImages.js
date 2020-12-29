import './UploadImages.scss'; 
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { storage } from '../../firebase';

import { BsImages } from 'react-icons/bs';
import { HiUpload } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { deleteImage, uploadImage } from '../../actions/homeActions';
import { setAlert } from '../../actions/alertActions';
import Resizer from 'react-image-file-resizer';

const UploadImages = props => {
    const deleteImage = props.deleteImage;
    const uploadImage = props.uploadImage;
    const setAlert = props.setAlert;
    const gallery = props.gallery;
    const admin = props.admin

    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState("");
    const [imageName, setImageName] = useState("");
    const [progress, setProgress] = useState(0);
    const random = Math.random().toString(36).substring(7);

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 550, 550 , 'JPEG', 50, 0, uri => { resolve(uri) }, 'base64');
    });
    const handleImageFile = async (e) => {
        setImageName(e.target.files[0].name)
        const resizeImage = await resizeFile(e.target.files[0])
        const blob = await fetch(resizeImage).then(r => r.blob())
        setImageFile(blob)
        setUploading(true)
    };
    const handleUpload = async (e) => {
        e.preventDefault()
        setUploading(false)

        const uploadTask = storage.ref(`/home/${random+imageName+imageFile}`).put(imageFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
        const progress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        )
        setProgress(progress)
        })

        try{
        await storage.ref(`/home/${random+imageName+imageFile}`).put(imageFile)
        const imageUrl = await storage.ref('home').child(random+imageName+imageFile).getDownloadURL()
        await uploadImage({url : imageUrl})
        setProgress(0)
        }catch(err){
            setProgress(0)
            setAlert("Only .jpg .png .jpeg is accepted.", 'primary')
            setUploading(false)
        }
    }
    const deleteImg = async (url, id) => {
        await deleteImage(id)
        await storage.refFromURL(url).delete()
    }

    return (
        <div className="home-upload-image-container">
            {admin === "admin" ? 
            <div className="upload-content">
                <form onSubmit={handleUpload}>
                    <label htmlFor="myfile"><BsImages/> Upload Images</label>
                    <input type="file" id="myfile" className="hidden" onChange={handleImageFile}/>
                    {uploading ? <li><button><HiUpload className=""/></button></li>: "" }<br/> 
                    <li><progress className="progress_bar" value={progress} max="100"/></li>
                    <p>{imageName}</p>
                </form>
            </div>
            : "" }

            <div className="gallery-content">
                {!gallery ? "" : gallery.map((el) => 
                <div className="images" key={el._id}>
                    <img src={el.url} alt="homeGallery" />
                    {admin === "admin" ? <button onClick={() => deleteImg(el.url, el._id)}><RiDeleteBin5Line/></button> : "" }
                </div>
                )}
            </div>
        </div>
    )
}

export default connect(null, {deleteImage, uploadImage, setAlert})(UploadImages)
