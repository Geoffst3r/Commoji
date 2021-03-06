import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, Redirect, useParams } from 'react-router-dom';
import { getServers } from '../../store/servers';

import AddServerModal from '../AddServerModal';
import './ServerPage.css'


const Server = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const serverId = params.serverId
    const user = useSelector(state => state.session.user);

    let servers = useSelector(state => {
        return state.servers.serversArray
    })

    useEffect(async () => {
        await dispatch(getServers());
        const newPersist = document.querySelector(`.server-${serverId}`);
        const anotherPersist = document.querySelector('.current-chosen-server');
        if (anotherPersist) anotherPersist.classList.remove('current-chosen-server');
        if (newPersist) newPersist.classList.add('current-chosen-server');
        return
    }, [dispatch, serverId])

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
                                <li className={`serverButtons server-pop server-${server.serverId}`} key={server.id} title={`${server.title}`}>
                                    <NavLink title={`${server.title}`} to={`/channels/${server.serverId}`}><button className='server-buttons'
                                        style={{backgroundImage: `url(${server.image})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: "no-repeat",
                                        backgroundClip: "text",
                                        color: color
                                    }}>{(server.title[0])}</button></NavLink>
                                </li>
                            )
                        })}
                        <div key='seperator-bottom' className='seperator'></div>
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
