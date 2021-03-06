import './UploadImage.scss';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../firebase';
import Resizer from 'react-image-file-resizer';

import { setAlert } from '../../../actions/alertActions';
import { deleteImage, uploadImage } from '../../../actions/adminActions';

import { BsImages } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { HiUpload } from 'react-icons/hi';

const Gallery = (props) => {

    const deleteImage = props.deleteImage;
    const uploadImage = props.uploadImage;
    const setAlert = props.setAlert;
    const image = props.image
    const id = props.id

    //upload images
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState("");
    const [imageName, setImageName] = useState("")
    const [progress, setProgress] = useState(0);
    const random = Math.random().toString(36).substring(7);

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 550, 550 , 'JPEG', 100, 0,
        uri => {
        resolve(uri);
        },
        'base64'
        );
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

        const uploadTask = storage.ref(`/products/${random+imageName+imageFile}`).put(imageFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
        const progress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        )
        setProgress(progress)
        })

        try{
        await storage.ref(`/products/${random+imageName+imageFile}`).put(imageFile)
        const imageUrl = await storage.ref('products').child(random+imageName+imageFile).getDownloadURL()
        await uploadImage(imageUrl, id)
        setProgress(0)
        }catch(err){
            setUploading(false)
            setProgress(0)
            setAlert("Only .jpg .png .jpeg is accepted.", 'primary')
        }
    }

    const deleteImg = async (url, image_id) => {
        await deleteImage(image_id, id)
        await storage.refFromURL(url).delete()
    }

    return (
        <div className="upload-image-container">
            <div className="upload-content">
                <form onSubmit={handleUpload}>
                    <label htmlFor="myfile"><BsImages/> Upload Images</label>
                    <input type="file" id="myfile" className="hidden" onChange={handleImageFile}/>
                    {uploading ? <li><button><HiUpload className=""/></button></li>: "" }<br/> 
                    <li><progress className="progress_bar" value={progress} max="100"/></li>
                    <p>{imageName}</p>
                </form>
            </div>
                    
            <div className="gallery-content">
                <li></li>
                {image.map((img, i) => 
                <div className="images" key={i}>
                    <li>
                        <img src={img.url} alt='' />
                        <button onClick={() => deleteImg(img.url, img._id)}><TiDelete/></button>
                    </li>
                </div>
                )}
                <li></li>
            </div>

        </div>
    )
}

export default connect(null, {deleteImage, uploadImage, setAlert})(Gallery)

