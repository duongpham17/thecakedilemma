import './Gallery.scss';
import React, {useState} from 'react'

const Gallery = props => {
    const data = props.data
    const [selectedImg, setSelectedImg] = useState("");

    return (
        <div className="gallery-container">
            
            <div className="gallery-select-image">
                {data.map((el) => 
                    <div className="images" key={el._id} onMouseEnter={() => setSelectedImg(el.url)}> 
                        <img src={el.url} alt='selectedimg' /> 
                    </div> 
                )}
            </div>
            
            <div className="gallery-main-image">
                <img src={data.length === 0 ? "" : selectedImg || data[0].url } alt="Under Construction :)" />
            </div>
        </div>
    )
}

export default Gallery
