import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getServers } from '../../store/servers';
import './ServerPage.css'


const  Server = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    let servers = useSelector(state => {
        return state.servers.serversArray
    })

    if (servers) {
        return (
            <div className='ServerContainer'>
                <ul className="Bar">
                {servers.map(server => {
                    return (
                        <NavLink to={`/channels/${server.serverId}`}><button className='ServerButtons'>{server.title}</button></NavLink>
                    )
                })}
                </ul >
            </div>

        )
    }
    return ('no servers :(')
}

export default Server;
