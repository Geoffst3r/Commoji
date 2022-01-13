import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getMessages, createMessage } from '../../store/messages';
import { io } from 'socket.io-client';
import MessageForm from './MessageForm';
import './MessagePage.css'

let socket;

const Messages = () => {
    // const [messages, setMessages] = useState([])
    const params = useParams();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const messages = useSelector(state => state.messages.messages);
    const channels = useSelector(state => state.channels)
    const serverId = params.serverId;
    const channelId = params.channelId;


    useEffect(() => {
        // create websocket/connect
        socket = io();

        socket.on("message", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            // setMessages(messages => [...messages, chat])
            //dispatch(createMessage(chat, channelId))
            dispatch(getMessages(channelId))
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch])

    useEffect(() => {
        dispatch(getMessages(channelId))
    }, [dispatch, channelId, serverId])

    if (messages && user) {
        return (
            <>
                <div className='MessageAndTitleContainer'><div className='ChannelName'>
                    < h1 >
                        {channels[intChannelId].title}
                    </h1 >
                </div >
                    <div className='messageOuterWrapper'>
                        <div className='MessagesContainer'>
                            <ul className="MessageUl">
                                {Object.keys(messages).map(message => {
                                    return (
                                        <>
                                            <li className='messageContentHolder' key={message.id}>
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
                    <MessageForm socket={socket}/>
                </div>
            </>
        )
    } else {
        return (
            <div className='messageWrapper'>
                <div className='MessageContainer'>
                    <ul className="MessageUl">
                        <li key='key'> Be the first to post a message to this channel! </li>
                    </ul >
                    <MessageForm socket={socket}/>
                </div>
            </div>
        )
    }
}

export default Messages;
