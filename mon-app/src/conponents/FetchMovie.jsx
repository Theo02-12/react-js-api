import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import '../styles/fetchMovie.css'
import MovieCard from './MovieCard';

const FetchMovie = () => {
  const [results, setResults] = useState([]);
  const [splited, setSplited] = useState([]);
  const [link, setLink] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = document.getElementById('search').value;
    const split = search.split(' ');
    setSplited(split);

    for (let i = 0; i < results.length; i++) {
      // console.log(results[i]);
      if (search === results[i].name || search === results[i].title) {
        console.log(results[i].name ? results[i].name : results[i].title);
        break;
      }
      // if(results[i].known_for){
      //     for (let y = 0; y < results[i].known_for.length; y++) {
      //         if (search === results[i].known_for[y].title) {
      //             console.log(results[i].name);
      //             // break
      //         }
      //     }
      // }
    }
  };

  useEffect(() => {
    const queryString = splited.map((word, index) => {
      const separator = index < splited.length - 1 ? '%20' : ''; // Add space unless it's the last word
      return encodeURIComponent(word) + separator;
    }).join('');

    const url = `https://api.themoviedb.org/3/search/multi?query=${queryString}`;
    setLink(url);

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWNmM2I5OTQzOGFkYjJmNjliMGY0ZDcxYjg1OTQ4ZCIsInN1YiI6IjY0YzI0NTU3MWNmZTNhMGViMzBjNjVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_YRDZpynJ2zMvcvii1urYQIPAsCtB1hLeLCbmChdB0',
          },
        });

        setResults(response.data.results);
      } catch (error) {
        console.log('error:', error);
      }
    };

    fetchData();
  }, [splited, link]);

  useEffect(() => {
    // This useEffect will be triggered whenever 'results' changes
    console.log(results);
  }, [results]);

  return (
    <>
    <div className='box'>
      <input onChange={handleSubmit} type='text' className='input' id='search' name='search' />
      </div>
      
      <div className='movieContainer'>
        {results.map((item, index) => {

          return <div key={index}>
          <MovieCard src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : ''} title={item.title} description={item.overview}/>
          </div>
        })}
      </div>
      </>

  );
};

export default FetchMovie;
