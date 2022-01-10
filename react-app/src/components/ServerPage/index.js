import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getServers } from '../../store/servers';
import AddServerModal from '../AddServerModal';
import './ServerPage.css'


const Server = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    let servers = useSelector(state => {
        return state.servers.serversArray
    })

    if (servers) {
        return (
            <>

                <div className='ServerContainer'>
                    <ul className="Bar">
                        {servers.map(server => {
                            return (
                                <li>
                                    <NavLink to={`/channels/${server.serverId}`}><button className='server-buttons'>{server.title}</button></NavLink>
                                </li>
                            )
                        })}
                        <li>
                            {/* <AddServerModal /> */}
                        </li>
                        <li>
                            <button className='add-server-button server-buttons'>Add Server</button>
                        </li>
                    </ul >

                </div>
            </>
        )
    }
    return ('no servers :(')
}

export default Server;
