import './Variety.scss';
import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';

import { getVariety} from '../../../actions/adminActions';

import Delete from './Delete';
import Active from './Active';
import Create from './Create';
import AddToBox from './AddToBox';
import BoxContent from './BoxContent';

const Variety = ({admin:{variety, loading}, getVariety}) => {

    useEffect(() => {
        if(!variety){
            getVariety()
        }
    }, [getVariety, variety])

    return (
        <div className="variety-container">
            <Create />

            <div className="variety-content">
            {loading ? <div className="loading"> Loading... </div> : ""}

            {!variety ? "" : 
            <Fragment>
                {variety.map((el) => 
                    <div className="card" key={el._id}>
                        <Delete id={el._id} />
                        <Active id={el._id} boolean={el.active} />
                        <h2>{el.title}</h2>
                        <AddToBox data={el} />
                        <BoxContent data={el} />
                    </div>
                )}
            </Fragment>
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {getVariety})(Variety)
