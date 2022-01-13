import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = () => {
    console.log("logedOut")
    dispatch(logout());
    history.push(`/`);
  };

  return <button className='NavButtons' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
