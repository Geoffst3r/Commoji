import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import * as channelActions from '../../store/channel'
// import ChannelForm from...
import './ChannelPage.css'
import Server from '../ServerPage';

const Channels = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const serverId = params.serverId;
    const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    // if (sessionUser) {
    //     const owner_define = sessionUser.id === server.ownerId;
    // }

    const channelsObj = useSelector(state => state.channels);
    // console.log(channelsObj);
    const channels = Object.values(channelsObj);


    useEffect(() => {
        dispatch(channelActions.getChannels(serverId));
    }, [dispatch]);

    return (
        <div className='ChannelContainer'>
            <div className='channel-modsANDinfo'>
                <p className='channels'>CHANNELS</p>
                {/* <button className="add-channel" onClick={() => setShowModal(true)} hidden={owner_define === true ? false : true}>Edit</button> */}
                {/* {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ChannelForm sessionUser={sessionUser} />
                    </Modal>
                )} */}
            </div>
            <ul className='channel-list'>
                {channels.length > 0 && channels.map(channel => (
                    <NavLink style={{ "textDecoration": "none", "color": "black" }}
                        key={channel.id} to={`/channels/${serverId}/${channel.id}`}>
                        <ul className='channels'>
                            <li className='channel-title'>{channel.title}</li>
                        </ul>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default Channels;
