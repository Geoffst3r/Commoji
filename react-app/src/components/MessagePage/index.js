import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getMessages } from '../../store/messages';
import * as reactionActions from '../../store/reaction';
import { io } from 'socket.io-client';
import MessageForm from './MessageForm';
import './MessagePage.css'
// import emojione from 'emojione'
// import * as emojione from emojione;


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
    const userId = user.id;
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
    }, [dispatch, channelId, serverId, userId]);

    const postReaction = async (unicode, messageId) => {
        // console.log('unicode B4 on comp', unicode)
        // const shortName = emojione.toShort(unicode);
        // console.log('unicode AFTER on comp', unicode)
        // console.log('shortname on comp', shortName)
        await dispatch(reactionActions.addReaction(unicode, messageId));
        await dispatch(reactionActions.getReactions());
        return 
    };

    console.log('_______messages', messages, 'reactions', reactions)

    if (messages && user && channels[intChannelId]?.title && reactions) {
        return (
            <>
                <div className='MessageAndTitleContainer'><div className='ChannelName'>
                    <div className='channel-name'>
                        <i className="fas fa-hashtag"></i>< h1 className='channel-name' >
                            {channels[intChannelId].title}
                        </h1 >
                    </div>
                </div >
                    <div className='messageOuterWrapper'>
                        <div className='MessagesContainer'>
                            <ul className="MessageUl">
                                {Object.keys(messages).map(message => {
                                    return (
                                        <>
                                            <li className='messageContentHolder' key={message}>
                                                {/* <div>&#x1F600;</div> */}
                                                {user.id === messages[message].userId ? <>
                                                    <div className='MessageAndButton'>
                                                        <div className='justNameAndButton'>
                                                            <div className='userMessage messageUser'>{messages[message].username}</div>
                                                            <button className='ReactionsButton' onClick={() => showReactions(message)}>+</button>
                                                            <div id={`message-${message}`} className='ReactionChoice hidden-reactions'>
                                                                <span onClick={() => postReaction('&#x1F600;', message)}>&#x1F600;</span>
                                                                <span onClick={() => postReaction('&#x1F602;', message)}>&#x1F602;</span>
                                                                <span onClick={() => postReaction('&#x1F643;', message)}>&#x1F643;</span>
                                                                <span onClick={() => postReaction('&#x1F607;', message)}>&#x1F607;</span>
                                                                <span onClick={() => postReaction('&#x1F615;', message)}>&#x1F615;</span>
                                                                {/* <span onClick={() => postReaction('far fa-grin-beam fa-2x', message)}><i className='far fa-grin-beam fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-smile-wink fa-2x', message)}><i className='far fa-smile-wink fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-grin-squint-tears fa-2x', message)}><i className='far fa-grin-squint-tears fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-sad-tear fa-2x', message)}><i className='far fa-sad-tear fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-angry fa-2x', message)}><i className='far fa-angry fa-2x'></i></span> */}
                                                            </div>
                                                        </div>
                                                        <div className='userMessage messageContent'>{messages[message].message}</div>
                                                    </div>
                                                    <div className='reactionsContainer'>
                                                        {reactions[message] && Object.keys(reactions[message]).map(individualReaction => {
                                                            if (reactions[message][individualReaction] > 0) {
                                                                if (individualReaction === '&#x1F600;') {
                                                                    return (
                                                                        <div className='reaction-individual'>
                                                                            <div className='emoji-display'>&#x1F600;</div>
                                                                            <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                                if (individualReaction === '&#x1F602;') {
                                                                    return (
                                                                        <div className='reaction-individual'>
                                                                            <div className='emoji-display'>&#x1F602;</div>
                                                                            <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                                if (individualReaction === '&#x1F643;') {
                                                                    return (
                                                                        <div className='reaction-individual'>
                                                                            <div className='emoji-display'>&#x1F643;</div>
                                                                            <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                                if (individualReaction === '&#x1F607;') {
                                                                    return (
                                                                        <div className='reaction-individual'>
                                                                            <div className='emoji-display'>&#x1F607;</div>
                                                                            <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                        </div>
                                                                    )
                                                                }
                                                                if (individualReaction === '&#x1F615;') {
                                                                    return (
                                                                        <div className='reaction-individual'>
                                                                            <div className='emoji-display'>&#x1F615;</div>
                                                                            <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                        </div>
                                                                    )

                                                                }
                                                            } else {
                                                                return (
                                                                    <div></div>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </> :

                                                    <>
                                                        <div className='MessageAndButton'>
                                                            <div className='justNameAndButton'>
                                                                <div className='messageUser'>{messages[message].username}</div>
                                                                <button className='ReactionsButton' onClick={() => showReactions(message)}>+</button>
                                                                <div id={`message-${message}`} className='ReactionChoice hidden-reactions'>
                                                                    <span onClick={() => postReaction('&#x1F600;', message)}>&#x1F600;</span>
                                                                    <span onClick={() => postReaction('&#x1F602;', message)}>&#x1F602;</span>
                                                                    <span onClick={() => postReaction('&#x1F643;', message)}>&#x1F643;</span>
                                                                    <span onClick={() => postReaction('&#x1F607;', message)}>&#x1F607;</span>
                                                                    <span onClick={() => postReaction('&#x1F615;', message)}>&#x1F615;</span>
                                                                    {/* <span onClick={() => postReaction('far fa-grin-beam fa-2x', message)}><i className='far fa-grin-beam fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-smile-wink fa-2x', message)}><i className='far fa-smile-wink fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-grin-squint-tears fa-2x', message)}><i className='far fa-grin-squint-tears fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-sad-tear fa-2x', message)}><i className='far fa-sad-tear fa-2x'></i></span>
                                                                <span onClick={() => postReaction('far fa-angry fa-2x', message)}><i className='far fa-angry fa-2x'></i></span> */}
                                                                </div>
                                                            </div>
                                                                <div className='messageContent'>{messages[message].message}</div>
                                                            </div>
                                                        <div className='reactionsContainer'>
                                                            {reactions[message] && Object.keys(reactions[message]).map(individualReaction => {
                                                                if (reactions[message][individualReaction] > 0) {
                                                                    if (individualReaction === '&#x1F600;') {
                                                                        return (
                                                                            <div className='reaction-individual'>
                                                                                <div className='emoji-display'>&#x1F600;</div>
                                                                                <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (individualReaction === '&#x1F602;') {
                                                                        return (
                                                                            <div className='reaction-individual'>
                                                                                <div className='emoji-display'>&#x1F602;</div>
                                                                                <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (individualReaction === '&#x1F643;') {
                                                                        return (
                                                                            <div className='reaction-individual'>
                                                                                <div className='emoji-display'>&#x1F643;</div>
                                                                                <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (individualReaction === '&#x1F607;') {
                                                                        return (
                                                                            <div className='reaction-individual'>
                                                                                <div className='emoji-display'>&#x1F607;</div>
                                                                                <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (individualReaction === '&#x1F615;') {
                                                                        return (
                                                                            <div className='reaction-individual'>
                                                                                <div className='emoji-display'>&#x1F615;</div>
                                                                                <span className='reactions-counter'>{reactions[message][individualReaction]}</span>
                                                                            </div>
                                                                        )

                                                                    }
                                                                } else {
                                                                    return (
                                                                        <div></div>
                                                                    )
                                                                }
                                                            })}
                                                        </div>
                                                        </>}
                                                    </li>
                                        </>
                                            )
                                })}
                                        </ul>
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
