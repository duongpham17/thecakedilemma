import './Image.scss';
import React, {useState} from 'react';

const Image = props => {
    const data = props.data
    const [selectedImg, setSelectedImg] = useState("");

    return (
        <div className="image-container">

            <div className="image-main">
                <img src={data.length === 0 ? "" : selectedImg || data[0].url } alt="Under Construction :)" />
            </div>
            
            <div className="image-select">
                {data.map((el, index) => 
                    <div className="images" key={index} onMouseEnter={() => setSelectedImg(el.url)}> 
                        <img src={el.url} alt='selectedimg' /> 
                    </div> 
                )}
            </div>

        </div>
    )
}


export default Image
