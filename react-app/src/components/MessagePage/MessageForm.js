import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../store/messages';
import { getMessages } from '../../store/messages';
import './MessageForm.css'

const MessageForm = ({socket}) => {
  const [errors, setErrors] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  const channelId = params.channelId;

  const user = useSelector(state => state.session.user)



  const onPost = async (e) => {
    e.preventDefault();
    setErrors([]);
    socket.emit("message", messageContent );
    // await dispatch(createMessage(messageContent, channelId))
      // .catch(async (res) => {
      //   // console.log('res', res)
      //   // const data = await res.json();
      //   // if (data && data.errors) return setErrors(data.errors);
      // });
    setMessageContent('');
    await dispatch(getMessages(channelId))
    return
  };;

  const updateMessageContent = (e) => {
    setMessageContent(e.target.value);
  };

  return (
    <>
      <div className='MessageFormContainer'>
        <form autocomplete="off" onSubmit={onPost} className='message-form'>
          <div className='message-error-box'>
            {errors.length > 0 && errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <label htmlFor='message'></label>
          <div>
            <input
              autocomplete="off"
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
      </div>
    </>
  );
};

export default MessageForm;
