import React from 'react';
import { NavLink } from 'react-router-dom';
import './ServerPage.css'

const Server = () => {
    return (
        <div className='ServerContainer'>
            <ul className="Bar">
                <NavLink to={`/channels/1`}><button className='ServerButtons'>First</button></NavLink>
                <NavLink to={`/channels/2`}><button className='ServerButtons'>second</button></NavLink>
            </ul >
        </div>
    )
}

export default Server;
