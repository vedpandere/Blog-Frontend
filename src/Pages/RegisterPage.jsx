import React, { useState } from 'react';
import {useSnackbar} from 'notistack';
import {Navigate} from 'react-router-dom';
import { BASE_URL } from '../Helper/helper';

function RegisterPage() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [redirect, setReDirect] = useState(false);

    // This is use to create a alert
    const { enqueueSnackbar } = useSnackbar();

    async function register(event){
        event.preventDefault();

        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body : JSON.stringify( {username, password} ),
            headers: {'Content-Type': 'application/json'},
        })

        if(response.ok === false) {
            enqueueSnackbar('Error! Registration Unsuccessful !', {variant: 'error' ,autoHideDuration: 2000});
            alert("Already Registerd OR Minimum 4 characters required")
        }
        else{
            enqueueSnackbar('Registered Successfully!', {variant: 'success' ,autoHideDuration: 2000});
            setReDirect(true);
        }
    }

    
    if (redirect) {
        return <Navigate to={'/login'} />
    }

  return (
    <form className='register' onSubmit={register}>

        <input type='text'
         placeholder='username'
         value={username}
         onChange={event => setUserName(event.target.value) } />

        <input type='password' 
         placeholder='password'
         value={password}
         onChange={event => setPassword(event.target.value)} />

         
        <button>Register</button>
    </form>
  )
}

export default RegisterPage