import './Stats.scss';
import React from 'react';
import { connect } from 'react-redux';
import {findStats} from '../../../actions/adminActions';

const Stats = ({admin:{stats}, findStats}) => {

    return (
        <div className="stats-container">
            <button onClick={() => findStats() }>Find Stats</button>

            {!stats ? "" :
            <div className="stats-content">
                {stats.map((el, index) => 
                    <li key={index}> {index + 1} : {el.email} - point {el.loyalty_point}</li>
                )}
            </div>
            }
        </div>
    )
}
const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {findStats})(Stats)
