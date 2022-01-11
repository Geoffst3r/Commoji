import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import * as channelActions from '../../store/channel';
import ChannelForm from './ChannelForm';
import './ChannelPage.css';

const Channels = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [showAddChannelModal, setShowAddChannelModal] = useState(false);
    const [showEditChannelModal, setShowEditChannelModal] = useState(false);

    const serverId = params.serverId;
    const channelId = params.channelId;
    const sessionUser = useSelector(state => state.session.user);
    const channelsObj = useSelector(state => state.channels);
    const channels = Object.values(channelsObj);
    let owner_define = false;
    if (sessionUser && channels.length) {
        if (sessionUser.id === channels[0].serverOwnerId) owner_define = true;
    };

    const callAddSetter = () => {
        setShowAddChannelModal(false);
    };

    const callEditSetter = () => {
        setShowEditChannelModal(false);
    };

    useEffect(() => {
        dispatch(channelActions.getChannels(serverId));
    }, [dispatch, serverId, channelId]);

    return (
        <div className='ChannelContainer'>
            <div className='channel-modsANDinfo'>
                <p className='channels'>CHANNELS</p>
                <button className="add-channel" onClick={() => setShowAddChannelModal(true)} hidden={owner_define === true ? false : true}>+</button>
                {showAddChannelModal && (
                    <Modal onClose={() => setShowAddChannelModal(false)}>
                        <ChannelForm callSetter={callAddSetter} />
                    </Modal>
                )}
            </div>
            {channels.length > 0 && <ul className='channel-list'>
                {channels.map(channel => (
                    <div className='channel' key={channel.id}>
                        <NavLink className={"ChannelLinks"} to={`/channels/${serverId}/${channel.id}`}>
                            <li className='channel-title'><i class="fas fa-hashtag"></i> {channel.title}</li>
                        </NavLink>
                        <button className='edit-channel-button-hidden'
                            onClick={() => setShowEditChannelModal(true)} hidden={owner_define === true ? false : true}>Edit</button>
                        {showEditChannelModal && (
                            <Modal onClose={() => setShowEditChannelModal(false)}>
                                <ChannelForm callSetter={callEditSetter} inputChannel={channel} />
                            </Modal>
                        )}
                    </div>
                ))}
            </ul>
            }
        </div>
    )
}

export default Channels;
