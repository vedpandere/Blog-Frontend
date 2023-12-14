import React from 'react';
import { Link } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';

const BackButton = () => {
  return (
    <Link
    to={'/'}
    className= 'back-btn'
>
    <BsArrowLeft className="arrow" />
</Link>
  )
}

export default BackButton