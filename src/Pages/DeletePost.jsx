import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {MdDelete} from 'react-icons/md'
import BackButton from '../Components/BackButton';
import { BASE_URL } from '../Helper/helper';

const DeletePost = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    async function handleDeletePost(){

        const response = await fetch(`${BASE_URL}/post/${id}`,{
            method: 'DELETE',
        })
        
        if(response.ok === false) {
          enqueueSnackbar("Error! Deletion UnSuccessfull", {variant: 'error' ,autoHideDuration: 2000});
            navigate('/')
        }
        else{
          enqueueSnackbar('Deletion Successfull!', {variant: 'success' ,autoHideDuration: 2000});
            navigate('/')
        }

    }

  return (
    <div className='dlt-container'>
    <BackButton />
    
        <button
        onClick={handleDeletePost}
        className='delete-button'
        >
        <MdDelete className='delete-icon' />
        Delete Post
      </button>

      <div className='warning-box'>
         <p className='warning-text'> This action will permanently delete the post </p>
      </div>
    </div>
  )
}

export default DeletePost