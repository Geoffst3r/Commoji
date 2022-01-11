import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else {
      history.push(`/channels`);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <h2 className='modal-label'>Welcome Back!</h2>
      <form onSubmit={onLogin} className='login-form'>
        <div className='error-box'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label htmlFor='email'>Email</label>
        <div>
          <input
            name='email'
            type='text'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <label htmlFor='password'>Password</label>
        <div>
          <input
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className='login-button' type='submit'>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
