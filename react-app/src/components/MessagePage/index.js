import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';


import { getMessages } from '../../store/messages';
import './MessagePage.css'
import MessageForm from './MessageForm';



const Messages = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const serverId = params.serverId;
    const channelId = params.channelId;
    useEffect(async () => {
        await dispatch(getMessages(channelId))
    }, [dispatch, channelId, serverId])



    const messages = useSelector(state => state.messages.messages);


    if (messages) {
        return (


            <div className='messageWrapper'>
                <div className='messageOuterWrapper'>
                    <div className='MessagesContainer'>
                        <ul className="MessageUl">
                            {Object.keys(messages).map(message => {
                                return (
                                    <>
                                        <li key={message.id}>
                                            {/* <div className='mesageContent'>{message.id}</div> */}
                                            {user.id === messages[message].userId ? <><div className='userMessage messageUser'>{messages[message].username}</div><div className='userMessage messageContent'>{messages[message].message}</div></> :
                                                <><div className='messageUser'>{messages[message].username}</div><div className='messageContent'>{messages[message].message}</div></>}
                                        </li>
                                    </>
                                )
                            })}
                        </ul >
                    </div>
                    <MessageForm />
                </div>
            </div>

        )
    }
    else {
        return (
            <div className='messageWrapper'>
                <div className='MessageContainer'>
                    <ul className="MessageUl">
                        <li>
                            <div> Be the first to post a message to this channel! </div>
                        </li>
                    </ul >
                    <MessageForm />
                </div>
            </div>

        )
    }

}

export default Messages;
