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

    const serverId = params.serverId;
    const channelId = params.channelId;


    useEffect(async () => {
        await dispatch(getMessages(channelId))

    }, [dispatch])

    let messages = useSelector(state => {
        console.log('state.messages.messageArr in useSelector_______', state.messages.messageArr)
        return state.messages.messageArr
    })


    if (messages) {
        return (


                <div className='messageWrapper'>
                    <ul className="MessageUl">
                        {messages.map(message => {
                            return (
                                <>
                                    <li>
                                        {/* <div className='mesageContent'>{message.id}</div> */}
                                        <div className='messageUser'>{message.username}</div>
                                        <div className='messageContent'>{message.message}</div>
                                    </li>
                                </>
                            )
                        })}
                    </ul >
                    <MessageForm />
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
