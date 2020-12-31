import "./Activate.scss";
import React from 'react';
import { connect } from 'react-redux';
import { BsCircleFill } from 'react-icons/bs';
import { activateProduct } from '../../../actions/adminActions';

export const Activate = props => {
    const id = props.id;
    const activateProduct = props.activateProduct;
    const boolean = props.boolean;
    const best = props.best;

    return (
        <div className="activate-container">
            <button onClick={() => activateProduct(id, boolean ? false : true, best === "none" ? "best" : "none" ) }><BsCircleFill className={boolean ? "icon-active" : "icon-not-active"}/></button>
        </div>
    )
}

export default connect(null, {activateProduct})(Activate)
