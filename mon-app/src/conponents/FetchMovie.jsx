import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import '../styles/fetchMovie.css'
import MovieCard from './MovieCard';



const FetchMovie = () => {
  const [results, setResults] = useState([]);
  const [link, setLink] = useState();
  const [searchResult, setSearchResult] = useState();
  const [media, setMedia] = useState();
  const [id, setId] = useState();



  const favoritePost = (e) => {
    console.log(results);
    for (let i = 0; i < results.length; i++) {

    }
  }



  // fonction onChange de la barre de recherche
  const handleChange = (e) => {
    e.preventDefault();
    const search = document.getElementById('search').value;
    setSearchResult(search)

  };
  // fetch api 
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/multi`;
    setLink(url);

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWNmM2I5OTQzOGFkYjJmNjliMGY0ZDcxYjg1OTQ4ZCIsInN1YiI6IjY0YzI0NTU3MWNmZTNhMGViMzBjNjVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_YRDZpynJ2zMvcvii1urYQIPAsCtB1hLeLCbmChdB0',
          },
          params: {
            query: searchResult
          }
        });

        setResults(response.data.results);
      } catch (error) {
        console.log('error:', error);
      }
    };

    fetchData();
  }, [searchResult, link]);

  useEffect(() => { }, [results]);
  return (
    // barre de recherche
    <>
      <div className='box'>
        <input onChange={handleChange} type='text' className='input' id='search' name='search' />
      </div>

      <div className='movieContainer'>
        {results.map((item, index) => {
          {/* setId(item.id)
          setMedia(item.media_type) */}
          // condition pour afficher les films
          if (item.media_type != 'person' && item.media_type != 'tv') {
            return <div key={index}>
              <MovieCard src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : ''} title={item.title} description={item.overview} vote={item.vote_count} id={item.id}
                onClick={async () => {

                  console.log(item.id)

                  const url = 'https://api.themoviedb.org/3/account/20211099/favorite';
                  const options = {
                    method: 'POST',
                    params: {
                      session_id: 'ba5fdfbc6dbd4b84dc4a3d56931157bde0b1e2aa'
                    },
                    headers: {
                      accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWNmM2I5OTQzOGFkYjJmNjliMGY0ZDcxYjg1OTQ4ZCIsInN1YiI6IjY0YzI0NTU3MWNmZTNhMGViMzBjNjVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_YRDZpynJ2zMvcvii1urYQIPAsCtB1hLeLCbmChdB0'
                    },
                    body: JSON.stringify({ 
                      media_type: 'movie',
                      media_id: 550,
                      favorite: true 
                      })
                  };
                
                  await axios.post(url, options)
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              />
            </div>
          }
          // condition pour afficher les films principaux d'un acteur donné
          if (item.known_for) {
            return item.known_for.map((films, idx) => {
              return <div key={idx}>
                <MovieCard src={films.poster_path ? `https://image.tmdb.org/t/p/w500/${films.poster_path}` : ''} title={films.title ? films.title : films.name} description={films.overview} vote={films.vote_count} id={films.id} />
              </div>
            })
          }

        })}
      </div>
    </>

  );
};

export default FetchMovie;
