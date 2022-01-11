import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { addChannel, updateChannel, removeChannel } from '../../store/channel';
import './ChannelForm.css'

const ChannelForm = ({inputChannel}) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(inputChannel ? inputChannel.title : '');
  const dispatch = useDispatch();
  const params = useParams();
  const serverId = params.serverId;
  const text = inputChannel ? 'Change Channel Name' : 'Create Channel'

  const onCreate = async (e) => {
    e.preventDefault();
    const data = await dispatch(addChannel(title, serverId));
    if (data) {
      setErrors(data);
    }
  };

  const onEdit = async (e) => {
      e.preventDefault();
      const data = await dispatch(updateChannel(inputChannel.id, title, serverId));
      if (data) {
          setErrors(data);
      }
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

//   if (user) {
//     return <Redirect to='/' />;
//   }

  return (
    <>
    <form onSubmit={inputChannel ? onEdit : onCreate} className='channel-form'>
      <div className='channel-error-box'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <label htmlFor='title'>Title</label>
      <div>
        <input
          name='title'
          type='text'
          value={title}
          onChange={updateTitle}
        />
      </div>
      <button className='channel-button' type='submit'>{text}</button>
    </form>
    </>
  );
};

export default ChannelForm;
