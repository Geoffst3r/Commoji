import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpModal from './SignUpModal'
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/channels'>
            <button className='NavButtons'>Home</button>
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpModal />
        </li>
      </>
    )
  }
  return (
    <>
    <nav>
    <div className='app-name'>👁‍🗨 Commoji</div>
      <ul>
        
        {sessionLinks}
      </ul>
    </nav>
    </>
  );
}

export default NavBar;
