import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, Redirect } from 'react-router-dom';
import { getServers } from '../../store/servers';

import AddServerModal from '../AddServerModal';
import './ServerPage.css'


const Server = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);

    let servers = useSelector(state => {
        return state.servers.serversArray
    })

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    if (!user) {
        return <Redirect to='/' />;
    }

    if (servers) {
        return (
            <>
                <div className='ServerContainer'>
                    <NavLink to='/channels/'>
                        <div title='Home' className='server-buttons home-button server-pop'></div>
                    </NavLink>
                    <ul className="Bar">
                    <div key='seperator' className='seperator'></div>
                        {servers.map(server => {
                            let color
                            if (server.image !== 'none') {
                               color = 'transparent'
                            } else {
                                color = 'white'
                            }
                            return (
                                <li className={"serverButtons server-pop"} key={server.id} title={`${server.title}`}>
                                    <NavLink title={`${server.title}`} to={`/channels/${server.serverId}`}><button className='server-buttons' style={{
                                        backgroundImage: `url(${server.image})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: "no-repeat",
                                        backgroundClip: "text",
                                        color: color
                                    }}>{(server.title[0])}</button></NavLink>
                                </li>
                            )
                        })}
                        <div key='seperator' className='seperator'></div>
                        <li className="server-pop" title="Add a server" key='add-server-modal'>
                            <AddServerModal />
                        </li>
                        <div key='empty-space' className='emptySpace'></div>
                    </ul>
                </div>
            </>
        )
    }
    return ('no servers :(')
}

export default Server;
