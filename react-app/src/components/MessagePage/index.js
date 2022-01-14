import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getMessages, createMessage } from '../../store/messages';
import * as reactionActions from '../../store/reaction';
import { io } from 'socket.io-client';
import MessageForm from './MessageForm';
import './MessagePage.css'

let socket;

const Messages = () => {
    // const [messages, setMessages] = useState([])
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const messages = useSelector(state => state.messages.messages);
    const channels = useSelector(state => state.channels);
    const reactions = useSelector(state => state.reactions);
    const serverId = params.serverId;
    const channelId = params.channelId;
    let intChannelId = parseInt(channelId);

    const showReactions = (id) => {
        const newReactionList = document.querySelector(`#message-${id}`);
        const oldReactionList = document.querySelector('.show-reaction-list');
        if (oldReactionList) {
            oldReactionList.classList.remove('show-reaction-list');
            oldReactionList.classList.add('hidden-reactions');
        };
        newReactionList.classList.remove('hidden-reactions');
        return newReactionList.classList.add('show-reaction-list');
    };

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
    }, [dispatch, channelId])

    useEffect(() => {
        dispatch(getMessages(channelId))
        dispatch(reactionActions.getReactions());
    }, [dispatch, channelId, serverId])


    if (messages && user && channels[intChannelId]?.title) {
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
                                            <li className='messageContentHolder' key={message}>
                                                {user.id === messages[message].userId ? <>
                                                    <div className='MessageAndButton'>
                                                        <div className='justNameAndButton'>
                                                            <div className='userMessage messageUser'>{messages[message].username}</div>
                                                            <button className='ReactionsButton' onClick={() => showReactions(message)}>+</button>
                                                            <div id={`message-${message}`} className='ReactionChoice display hidden-reactions'>
                                                                <span>1</span>
                                                                <span>2</span>
                                                                <span>3</span>
                                                            </div>
                                                        </div>
                                                        <div className='userMessage messageContent'>{messages[message].message}</div>
                                                    </div>
                                                    <div className='reactionsContainer'><span>hello</span></div>
                                                </> :
                                                    <>
                                                        <div className='MessageAndButton'>
                                                            <div className='justNameAndButton'>
                                                                <div className='messageUser'>{messages[message].username}</div>
                                                                <button className='ReactionsButton' onClick={() => showReactions(message)}>+</button>
                                                                <div id={`message-${message}`} className='ReactionChoice display hidden-reactions'>
                                                                    <span>1</span>
                                                                    <span>2</span>
                                                                    <span>3</span>
                                                                </div>
                                                            </div>
                                                            <div className='userMessage messageContent'>{messages[message].message}</div>
                                                        </div>
                                                        {/* <div className='reactionsContainer'><div className='Reactions'>hello</div></div> */}
                                                    </>}
                                            </li>
                                        </>
                                    )
                                })}
                            </ul >
                        </div>
                    </div>
                    <MessageForm socket={socket} />
                </div>
            </>
        )
    } else {

        return (
            <div className='messageWrapper'>
                <div className='MessageContainer'>
                    <ul className="MessageUl">
                        <li key='key'> Loading Chats... </li>
                    </ul >
                </div>
            </div>
        )
    }
}

export default Messages;
