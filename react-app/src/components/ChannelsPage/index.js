import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import './ChannelPage.css'

const Channels = () => {
    const params = useParams();
    return (
        <div className='ChannelContainer'>
            {params.serverId}
        </div>
    )
}

export default Channels;
