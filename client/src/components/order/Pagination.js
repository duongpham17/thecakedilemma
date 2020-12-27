import './Pagination.scss';
import React, {Fragment, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';

const Pagination = (props) => {
    const location = useLocation();
    const history = useHistory();
    const orderLength = props.orderLength;
    const limit = props.limit;
    const page = props.page;
    const getOrders = props.getOrders;
    const getAdminOrders = props.getAdminOrders;
    const user = props.user;
    const setPage = props.setPage;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pages = parseInt(params.get('page'));
        setPage(pages ? pages : page);

        if(user.role === "admin"){
            getAdminOrders(page, limit)
        } else {
            getOrders(page, limit)
        }

    }, [getOrders, getAdminOrders, user, page, setPage, location, limit])
    
    const increment = () => {
        setPage(page + 1)
        history.push(`?page=${(page + 1)}`)
        window.scrollTo({top: 0, "behavior": "smooth"})
    }
    
    const decrement = () => {
        if(page > 1){
            setPage(page - 1)
            history.push(`?page=${(page - 1)}`)
        } else {
            return 1
        }
        window.scrollTo({top: 0, "behavior": "smooth"})
    }

    return (
        <div className="pagination-container">
        {orderLength >= limit ? 
        <Fragment>
            <button onClick={() => decrement()}><RiArrowLeftSLine/></button>
            <button>{page}</button>
            {orderLength >= limit ? 
            <button onClick={() => increment()}><RiArrowRightSLine/></button>
            : ""}
        </Fragment>
        : "" }
    </div>
    )
}

export default Pagination
