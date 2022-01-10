
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignUpModal from './SignUpModal'
import './NavBar.css'
import { useSelector } from 'react-redux';
import AddServerForm from './AddServerForm';
import AddServerModal from './AddServerModal';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/channels'>
            <button>Home</button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/form'>
            <AddServerForm/>
          </NavLink>
          <AddServerModal/>
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
    <nav>
      <ul>
      {sessionLinks}




      </ul>
    </nav>
  );
}

export default NavBar;
