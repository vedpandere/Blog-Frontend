import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import {AiOutlinePlusSquare} from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import { BASE_URL } from '../Helper/helper';

const Header = () => {

      // This is use to create a alert
      const { enqueueSnackbar } = useSnackbar();

  // We will grab the userInfo from context and then change here
  const {userInfo ,setUserInfo } = useContext(UserContext);

  useEffect( () => {
    fetch(`${BASE_URL}/profile`, {
      credentials: 'include',
    }).then((response) => {
      response.json().then(userInfo => {

        setUserInfo(userInfo);
      })
      .catch((error) => console.error('Error:', error));
    })
    // console.log("Header UserInfo",userInfo);
  }, []);

  function logout() {
    fetch(`${BASE_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    enqueueSnackbar('Logout Successfully!', {variant: 'success' ,autoHideDuration: 2000});
  }

  const username = userInfo?.username;

  return (
    <div className='header'>
        <Link to='/' className='logo'>
          My Blog
        </Link>
        <nav className='nav'>

        {!username && (
          <div className='Header-Home'>
            <Link to="/login"><h1 className='header-login'>Login</h1></Link>
            <Link to="/register"><h1 className='header-register'>Register</h1></Link>
          </div>
        )}

        { username && (
          <>
            <h4>{username}</h4>
            <Link to="/create">
              <div className='w-24'>
                <AiOutlinePlusSquare className='create-icon' />
              </div>
            </Link>
            <a onClick={logout}>Logout</a>
          </>
        )}

        </nav>
    </div>
  )
};

export default Header