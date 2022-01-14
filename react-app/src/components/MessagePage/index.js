import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { emojify } from 'react-emojione';
import { getMessages } from '../../store/messages';
import * as reactionActions from '../../store/reaction';
import { io } from 'socket.io-client';
import MessageForm from './MessageForm';
import './MessagePage.css'

let socket;

const Messages = () => {
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
        newReactionList.classList.add('show-reaction-list');
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

    const postReaction = (data, messageId) => {
        dispatch(reactionActions.addReaction(data, messageId))
    }


    if (messages && user && channels[intChannelId]?.title && reactions) {
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
                                                            <div id={`message-${message}`} className='ReactionChoice hidden-reactions'>
                                                                <span onClick={() => postReaction(':smile:', message)}>{emojify(':smile:')}</span>
                                                                <span onClick={() => postReaction(':wink:', message)}>{emojify(':wink:')}</span>
                                                                <span onClick={() => postReaction('xDD', message)}>{emojify('xDD')}</span>
                                                                <span onClick={() => postReaction(':cry:', message)}>{emojify(':cry:')}</span>
                                                                <span onClick={() => postReaction(':thumbsup:', message)}>{emojify(':thumbsup:')}</span>
                                                                <span onClick={() => postReaction(':thumbsdown:', message)}>{emojify(':thumbsdown:')}</span>
                                                            </div>
                                                        </div>
                                                        <div className='userMessage messageContent'>{messages[message].message}</div>
                                                    </div>
                                                    {reactions.message && <div className='reactionsContainer'>
                                                        {reactions.message.map(individualReaction => (
                                                            <div className='reaction-individual'>
                                                                {emojify(individualReaction.reaction)}
                                                            </div>
                                                        ))}
                                                    </div>}
                                                </> :
                                                <>
                                                    <div className='MessageAndButton'>
                                                        <div className='justNameAndButton'>
                                                            <div className='messageUser'>{messages[message].username}</div>
                                                            <button className='ReactionsButton' onClick={() => showReactions(message)}>+</button>
                                                            <div id={`message-${message}`} className='ReactionChoice hidden-reactions'>
                                                                <span onClick={() => postReaction(':smile:', message)}>{emojify(':smile:')}</span>
                                                                <span onClick={() => postReaction(':wink:', message)}>{emojify(':wink:')}</span>
                                                                <span onClick={() => postReaction('xDD', message)}>{emojify('xDD')}</span>
                                                                <span onClick={() => postReaction(':cry:', message)}>{emojify(':cry:')}</span>
                                                                <span onClick={() => postReaction(':thumbsup:', message)}>{emojify(':thumbsup:')}</span>
                                                                <span onClick={() => postReaction(':thumbsdown:', message)}>{emojify(':thumbsdown:')}</span>
                                                            </div>
                                                        </div>
                                                        <div className='userMessage messageContent'>{messages[message].message}</div>
                                                    </div>
                                                    <div className='reactionsContainer'>
                                                    {reactions[message] && Object.values(reactions[message]).map(individualReaction => {
                                                            return (
                                                                <div className='reaction-individual'>
                                                                    {emojify(individualReaction.reaction)}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </>}
                                            </li>
                                        </>
                                    )
                                })}
                            </ul >
                        </div>
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
                        <li key='key'> Loading Chats... </li>
                    </ul >
                </div>
            </div>
        )
    }
}

export default Messages;
