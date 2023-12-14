import React, { useContext, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { useSnackbar } from 'notistack';
import { BASE_URL } from '../Helper/helper';
function LoginPage() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [redirect, setReDirect] = useState(false);

    const {setUserInfo} = useContext(UserContext);

    // This is use to create a alert
    const { enqueueSnackbar } = useSnackbar();

    async function login(event){
        event.preventDefault();

        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body : JSON.stringify( {username, password} ),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        if (response.ok) {
            enqueueSnackbar('Login Successfully!', {variant: 'success' ,autoHideDuration: 2000});
            response.json().then( userInfo => {
                setUserInfo(userInfo);
                setReDirect(true);
            })
        } else {
            enqueueSnackbar('Error ! Login Unsuccessful', {variant: 'error' ,autoHideDuration: 2000});
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

  return (
    <form className='login' onSubmit={ login }>

        <input type='text' 
            placeholder='username'
            value={username} 
            onChange={event => setUserName(event.target.value)}
        />
        <input type='password'
            placeholder='password'
            value={password} 
            onChange={event => setPassword(event.target.value)}
        />

        <button>Login</button>
    </form>
  )
}

export default LoginPage