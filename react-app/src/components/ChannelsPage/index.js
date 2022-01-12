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
    const history = useHistory();
    const [showAddChannelModal, setShowAddChannelModal] = useState(false);
    const [showEditChannelModal, setShowEditChannelModal] = useState(false);
    const [cogWheelClicked, setCogWheelClicked] = useState(false);
    const [individualChannel, setIndividualChannel] = useState({});

    const serverId = params.serverId;
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
        dispatch(channelActions.getChannels(serverId))
    };

    const modChannel = (channel) => {
        setIndividualChannel(channel);
        const channelMod = document.getElementById(`channel-mod-${channel.id}`);
        const cogWheel = document.getElementById(`cog-wheel-${channel.id}`);

        if (channelMod.className === 'mod-channel-visible') {
            channelMod.className = 'mod-channel-hidden';
            cogWheel.className = 'mod-channel-button';
            setCogWheelClicked(false);
        } else {
            channelMod.className = 'mod-channel-visible';
            cogWheel.className = 'mod-channel-button-persist';
            setCogWheelClicked(true);
        };
    };

    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to remove this channel from your server?')
        if (confirmed) {
            dispatch(channelActions.removeChannel(individualChannel));
            history.push(`/channels/${serverId}`);
        }
    }

    useEffect(() => {
        if (!cogWheelClicked && !individualChannel) return;

        const closeMenu = (e) => {
            const channelMod = document.getElementById(`channel-mod-${individualChannel.id}`);
            const cogWheelButton = document.getElementById(`cog-wheel-${individualChannel.id}`);
            const cogWheel = document.getElementById(`cog-icon-${individualChannel.id}`)

            if (channelMod && cogWheelButton && e.target !== channelMod && e.target !== cogWheelButton && e.target !== cogWheel) {
                channelMod.className = 'mod-channel-hidden';
                cogWheelButton.className = 'mod-channel-button';
                setCogWheelClicked(false);
            }
            return
        };

        document.addEventListener('click', closeMenu, false);

        return () => document.removeEventListener("click", closeMenu);
    }, [individualChannel, cogWheelClicked]);

    useEffect(() => {
        dispatch(channelActions.getChannels(serverId));
    }, [dispatch, serverId]);

    if (serverId) {

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
                            <div className='channel-wrap'>
                                <NavLink className={"ChannelLinks"} to={`/channels/${serverId}/${channel.id}`}>
                                    {channel.title.length > 19 ? <li className='channel-title'><i className="fas fa-hashtag"></i> {channel.title.toLowerCase().slice(0, 19)}</li>
                                        : <li className='channel-title'><i className="fas fa-hashtag"></i> {channel.title.toLowerCase()}</li>}
                                </NavLink>
                                <button className='mod-channel-button' id={`cog-wheel-${channel.id}`} onClick={() => modChannel(channel)}
                                    hidden={owner_define === true && channel.title.toLowerCase() !== 'general' ? false : true}><i className='fas fa-cog' id={`cog-icon-${channel.id}`}></i></button>
                            </div>
                            {owner_define && <ul className='mod-channel-hidden' id={`channel-mod-${channel.id}`}>
                                <li>
                                    <button className='edit-channel-button' onClick={() => setShowEditChannelModal(true)}>Change Channel Name</button>
                                    {showEditChannelModal && (
                                        <Modal onClose={() => setShowEditChannelModal(false)}>
                                            <ChannelForm callSetter={callEditSetter} inputChannel={individualChannel} />
                                        </Modal>
                                    )}
                                </li>
                                <li>
                                    <button className='delete-channel-button' onClick={() => handleDelete()}>Delete Channel</button>
                                </li>
                            </ul>}
                        </div>
                    ))}


                    <div className='ChannelsEmptySpace'></div>
                </ul>
                }
            </div>
        )
    } else {
        return (
            <div className='ChannelContainer'>
                Select a server to view the channels within it...
            </div>
        )
    }
}


export default Channels;
