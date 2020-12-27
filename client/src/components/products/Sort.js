import './Sort.scss';
import React, {Fragment, useState} from 'react';
import {HiSortAscending, HiSortDescending} from 'react-icons/hi';
import {BsCalendar} from 'react-icons/bs';
import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri';

const Sort = props => {

    const setSort = props.setSort;
    const sort = props.sort;
    const [open, setOpen] = useState(false)

    const filter_query = [
        {id: 1, query: "-price",       description: " Price",       icon: "high"},
        {id: 2, query: "price" ,       description: " Price",       icon: "low"},
        {id: 3, query: "-quantity",    description: " Quantity",    icon: "high"},
        {id: 4, query: "quantity",     description: " Quantity",    icon: "low"},
        {id: 5, query: "-createdAt",   description: " Newest",      icon: "time"},
        {id: 6, query: "createdAt",    description: " Oldest",      icon: "time"}
    ]

    const pickedSort = (sort) => {
        setOpen(false)
        setSort(sort)
        localStorage.setItem('sort', sort)
    }

    return (
        <div className="sort-container">
            <button className="sort-btn" onClick={() => setOpen(!open)}>Sort {open ? <RiArrowLeftSLine className="icon"/> : <RiArrowRightSLine className="icon"/>} </button>

            {open ?
            <Fragment>
            {filter_query.map(el => 
            <button key={el.id} className={el.query === sort ? "i-sort" : ""} onClick={() => pickedSort(el.query)}>
                {el.icon === "high" ? <HiSortAscending className="icon" /> : el.icon === "low" ? <HiSortDescending className="icon" /> : <BsCalendar className="icon" /> }
                {el.description}
            </button>
            )}
            </Fragment>
            : "" }
            
        </div>
    )
}

export default Sort
