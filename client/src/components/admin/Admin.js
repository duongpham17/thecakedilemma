import './Admin.scss';
import React, {useState} from 'react';

import Stats from './stats/Stats';
import FindOrder from './find-order/FindOrder';
import CreateProduct from './create-product/CreateProduct';
import Dashboard from './dashboard/Dashboard';

const Admin = () => {
    const [open, setOpen] = useState("")

    return (
        <div className="admin-container">
            <ul>
                <li><button className={open === "stats" ? "open" : ""} onClick={() => setOpen(open === "stats" ? "" : "stats")}>Stats</button></li>
                <li><button className={open === "find" ? "open" : ""} onClick={() => setOpen(open === "find" ? "" : "find")}>Find</button></li>
                <li><button className={open === "createProduct" ? "open" : ""} onClick={() => setOpen(open === "createProduct" ? "" : "createProduct")}>Create</button></li>
            </ul>

            {open === "stats" ? 
            <Stats />
            : "" }

            {open === "find" ? 
            <FindOrder />
            : "" }

            {open === "createProduct" ? 
            <CreateProduct />
            : "" }

            <Dashboard />
        </div>
    )
}

export default Admin
