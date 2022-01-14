import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addChannel, updateChannel } from '../../store/channel';
import './ChannelForm.css'

const ChannelForm = ({ inputChannel, callSetter }) => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(inputChannel ? inputChannel.title : '');
  const dispatch = useDispatch();
  const params = useParams();
  const serverId = params.serverId;
  const text = inputChannel ? 'Change Channel Name' : 'Create Channel';

  const onCreate = async (e) => {
    e.preventDefault();
    setErrors([]);
    const requestChannel = { title, serverId };

    let newChannel = await dispatch(addChannel(requestChannel))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
    callSetter();
    console.log('!!!!!!!!!!!!!! newChannel', newChannel, 'servid', serverId)
    return history.push(`/channels/${serverId}/${newChannel['id']}`)
  };

  const onEdit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const requestChannel = { id: inputChannel.id, title, serverId };
    await dispatch(updateChannel(requestChannel))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
    callSetter();
    return
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={inputChannel ? onEdit : onCreate} className='channel-form'>
        <div className='channel-error-box'>
          {errors.length > 0 && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='LabelAndInputContainer'>
          <label htmlFor='title'>Title</label>
          <input
            name='title'
            type='text'
            value={title}
            onChange={updateTitle}
            required
            autoComplete="off"
          />
        </div>
        <button className='channel-button' type='submit'>{text}</button>
      </form>
    </>
  );
};

export default ChannelForm;
