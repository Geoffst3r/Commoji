import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createMessage } from '../../store/messages';
import './MessageForm.css'
import { getMessages } from '../../store/messages';


const MessageForm = () => {
  const [errors, setErrors] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  const channelId = params.channelId;

  const onPost = async (e) => {
    e.preventDefault();
    setErrors([]);
    // const requestChannel = {title, serverId};
    await dispatch(createMessage(messageContent, channelId))
      .catch(async (res) => {
        // console.log('res', res)
        // const data = await res.json();
        // if (data && data.errors) return setErrors(data.errors);

      });
    await dispatch(getMessages(channelId))
    return
  };

  const updateMessageContent = (e) => {
    setMessageContent(e.target.value);
  };


  return (
    <>
      <form onSubmit={onPost} className='message-form'>
        <div className='message-error-box'>
          {errors.length > 0 && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label htmlFor='message'></label>
        <div>
          <input
            name='message'
            type='text'
            value={messageContent}
            onChange={updateMessageContent}
            className='messageInput'
            placeholder='Message this channel'
          />
        </div>
        <button className='message-button' type='submit'>submit</button>
      </form>
    </>
  );
};

export default MessageForm;
