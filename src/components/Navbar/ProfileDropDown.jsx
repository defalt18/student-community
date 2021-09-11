import React from 'react'
import { Link } from 'react-router-dom'

import "./ProfileDropDown.css"
import DA_Logo from "./DA-logo.png";

function ProfileDropDown({ userDetails }) {
    const { image } = userDetails;

    return (
        <div>
            <button className="menu-btn-1121">
                <img className="img-user" src={image} alt="Avatar" />
            </button>
            <div className="user-menu-1121">
                <Link to="/profile" >Profile</Link>
                <Link to="/setting" >Setting</Link>
                <Link to="/logout" >Logout</Link>
            </div>
        </div>
    )
}

export default ProfileDropDown
