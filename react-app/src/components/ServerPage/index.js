import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getServers } from '../../store/servers';
import './ServerPage.css'


const Server = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const servers = useSelector(state => {
        return state.servers
    })

    const serverArr = Object.values(servers)


    if (servers) {
        return (
            <div className='ServerContainer'>
                <ul className="Bar">
                {serverArr.map(server => {
                    return (
                        <NavLink to={`/channels/${server.id}`}><button className='ServerButtons'>${server.name}</button></NavLink>
                    )
                })}
                </ul >
            </div>

        )
    }
}

export default Server;
