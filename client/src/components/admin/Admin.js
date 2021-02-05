import './Admin.scss';
import React, {useState} from 'react';

import {AiFillGift, AiFillSetting, AiOutlineFileSearch} from 'react-icons/ai';
import {ImStatsBars} from 'react-icons/im';
import {MdCreate} from 'react-icons/md';

import Setting from './setting/Setting';
import Gift from './gift/Gift';
import Stats from './stats/Stats';
import FindOrder from './find-order/FindOrder';
import CreateProduct from './create-product/CreateProduct';
import Dashboard from './dashboard/Dashboard';

const Admin = () => {
    const [open, setOpen] = useState("")

    return (
        <div className="admin-container">
            <ul>
                <li><button className={open === "setting" ? "open" : ""} onClick={() => setOpen(open === "setting" ? "" : "setting")}><AiFillSetting/></button></li>
                <li><button className={open === "gift" ? "open" : ""} onClick={() => setOpen(open === "gift" ? "" : "gift")}><AiFillGift/></button></li>
                <li><button className={open === "stats" ? "open" : ""} onClick={() => setOpen(open === "stats" ? "" : "stats")}><ImStatsBars/></button></li>
                <li><button className={open === "find" ? "open" : ""} onClick={() => setOpen(open === "find" ? "" : "find")}><AiOutlineFileSearch/></button></li>
                <li><button className={open === "createProduct" ? "open" : ""} onClick={() => setOpen(open === "createProduct" ? "" : "createProduct")}><MdCreate/></button></li>
            </ul>

            {open === "setting" ?   <Setting />     : "" }

            {open === "gift"    ?   <Gift />     : "" }

            {open === "stats"   ?   <Stats />       : "" }

            {open === "find"    ?   <FindOrder />   : "" }

            {open === "createProduct" ?  <CreateProduct />  : "" }

            <Dashboard />
        </div>
    )
}

export default Admin
