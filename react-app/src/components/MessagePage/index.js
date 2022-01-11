import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';


import { getMessages } from '../../store/messages';
// import AddServerModal from '../AddServerModal';
import './MessagePage.css'


const Messages = () => {
    const params = useParams();
    const dispatch = useDispatch()

    const serverId = params.serverId;
    const channelId = params.channelId;

// OBTAIN channelId !!!! maybe from state or url params ...

    useEffect(() => {
        dispatch(getMessages(channelId))
    }, [dispatch])

    // let messages = useSelector(state => {
    //     return state.messages.messageArr
    // })

//     if (messages) {
//         return (
//             <>

//                 <div className='MessageContainer'>
//                     <ul className="MessageUl">
//                         {messages.map(message => {
//                             return (
//                                 <li>
//                                     <div><{message.messsage}</div>
//                                     <div><{message.userId}</div>
//                                 </li>
//                             )
//                         })}


//                     </ul >

//                 </div>
//             </>
//         )
//     }
//     return ('no messages here!')
    console.log('params', params)
        return (`no messages channel number ${channelId}`)

}

export default Messages;
