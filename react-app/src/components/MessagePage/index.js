import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';


import { getMessages } from '../../store/messages';
// import AddServerModal from '../AddServerModal';
import './MessagePage.css'
import MessageForm from './MessageForm';



const Messages = () => {
    const params = useParams();
    const dispatch = useDispatch()

    const serverId = params.serverId;
    const channelId = params.channelId;

    // OBTAIN channelId !!!! maybe from state or url params ...

    useEffect(() => {
        dispatch(getMessages(channelId))

    }, [dispatch])

    let messages = useSelector(state => {
        // console.log('_______STATE in useSelector_______', state)
        return state.messages.messageArr
    })

    let messagesRev;
    if (messages) {

        console.log("___________before rev messages__________", messages)
        // console.log('reversing', messages.reverse())
        // messagesRev = messages.reverse().map()
        // console.log("___________after messages__________", messagesRev)
    }

    if (messages) {
        return (
            <>

                <div className='MessageContainer'>
                    <ul className="MessageUl">
                        {messages.map(message => {
                            return (
                                <>
                                    <li>
                                        <div className='mesageContent'>{message.message}</div>
                                        <div className='messageUser'>{message.username}</div>
                                    </li>


                                </>
                            )
                        })}


                    </ul >
                    <MessageForm />
                </div>
            </>
        )
    }
    return ('no messages here!')
    console.log('params', params)
    return (`no messages channel number ${channelId}`)

}

export default Messages;
