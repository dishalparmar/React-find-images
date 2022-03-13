import React from 'react';
import { ImageListItemBar } from '@mui/material';
import './Image.css'

const Image = ({imgUrl, tags, likes}) => {
  return (
    <div className='image'>
      <img src={imgUrl} alt={tags} className='img-size' />
      <ImageListItemBar className='image-info-bar' title={tags} subtitle={`${likes} likes`} />
    </div>
  )
}

export default Image