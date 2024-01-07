import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from './SearchBar';
import './ImageGallery.css';

const accessKey = 'vJKvVoJuveyiZkj4FVzIafEzSx4E91iC2TjdIDhUWvM'; 
const apiUrl = 'https://api.unsplash.com/photos';
const searchApiUrl = 'https://api.unsplash.com/search/photos';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchImages = async (url, term = '') => {
    try {
      const response = await fetch(
        term
          ? `${url}?query=${term}&page=${page}&per_page=10&client_id=${accessKey}`
          : `${url}?page=${page}&per_page=1000&client_id=${accessKey}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
  
      const data = await response.json();
  
      if (term) {
        if (data.results && data.results.length === 0) {
          setHasMore(false);
        } else {
          setImages([...images, ...data.results]);
          setPage(page + 1);
        }
      } else {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setImages([...images, ...data]);
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  

  useEffect(() => {
    if (searchTerm) {
      fetchImages(searchApiUrl, searchTerm);
    } else {
      fetchImages(apiUrl);
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    setImages([]);
    setHasMore(true);
    setPage(1);
    setSearchTerm(term);
  };

  const handleClear = () => {
    setImages([]);
    setHasMore(true);
    setPage(1);
    setSearchTerm('');
    fetchImages(apiUrl);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <InfiniteScroll
        dataLength={images.length}
        next={() => fetchImages(searchTerm ? searchApiUrl : apiUrl)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image) => (
            <img key={image.id} src={image.urls.small} alt={image.alt_description} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ImageGallery;
