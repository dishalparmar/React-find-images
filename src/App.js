import React, {useEffect, useState, useCallback} from 'react';
import './App.css';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Image from './Image/Image';

function App() {

  const API_KEY ='...';
  const [imgPerPage, setImgPerPage] = useState(5);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [errImgNotFound, setErrImgNotFound] = useState('');
  const showErrMessage = {display: 'block'};

  //#region Api Call

  const getImages = useCallback(async () => {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=${imgPerPage}&safesearch=true`)
                            .then(response => response.json())
                            .then(data => {
                              if (data.hits.length > 0) {
                                setImages(data.hits);
                              }else {
                                setImages([]);
                                setErrImgNotFound('Opss! The image you were looking for could not be found');
                              }
                            })
  }, [query, imgPerPage]);

  //#endregion Api Call

  //#region Img Limit
  const onImgLimitChange = (e) => {
    setImgPerPage(e.target.value)
    setImages([]);
    setQuery('');
    setErrImgNotFound('');
  }
  //#endregion Img Limit

  //#region Update Query
  const updateSearch = (e) => {
    if (e.target.value !== '') {
      setQuery(e.target.value);
    }else {
      setImages([]);
      setQuery('');
      setErrImgNotFound('');
    }
  };
  //#endregion Update Query

  useEffect(() => {
    if (query !=='') {
      getImages();
    }
  }, [getImages, query]);


  return (
    <div className="app">
      <div className='app-header'>
        <InputLabel className='app-header-ddl-lbl'>Image Limit</InputLabel>
        <Select value={imgPerPage}
                onChange={onImgLimitChange}
                className='app-header-ddl'>
          <MenuItem value={5}>5 Images</MenuItem>
          <MenuItem value={10}>10 Images</MenuItem>
          <MenuItem value={20}>20 Images</MenuItem>
          <MenuItem value={30}>30 Images</MenuItem>
          <MenuItem value={40}>40 Images</MenuItem>
          <MenuItem value={50}>50 Images</MenuItem>
        </Select>
        <TextField label='Find images'
                   fullWidth={true}
                   value={query}
                   onChange={updateSearch} />
      </div>
      <div className='app-images'>
      {
        images.length > 0 ? images.map((image) => (
          <Image key={image.id}
                 imgUrl={image.largeImageURL}
                 tags={image.tags}
                 likes={image.likes} />
        )) : <span className='app-err-message' style={errImgNotFound !=='' ? showErrMessage : null}>{errImgNotFound}</span>
      }
      </div>
    </div>
  );
}

export default App;
