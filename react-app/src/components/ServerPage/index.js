import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink, useParams, Redirect } from 'react-router-dom';
import { deleteServer, getServers } from '../../store/servers';

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
                    <ul className="Bar">
                        {servers.map(server => {
                            return (
                                <li className={"serverButtons"} key={server.id}>
                                    <NavLink to={`/channels/${server.serverId}`}><button className='server-buttons' style={{
                                        backgroundImage: `url(${server.image})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: "no-repeat"
                                    }}></button></NavLink>
                                </li>
                            )
                        })}
                        <li key={'add-server-modal'}>
                            <AddServerModal />
                        </li>
                        <div className='emptySpace'></div>
                    </ul>
                </div>
            </>
        )
    }
    return ('no servers :(')
}

export default Server;
