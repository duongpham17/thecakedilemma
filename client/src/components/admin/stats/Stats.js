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
                    <li key={index}> {index + 1} -- Loyalty Points {el.loyalty_point} -- {el.email}</li>
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
