import React, { useEffect, useState } from 'react'

const FetchMovie = () => {
    const [results, setResults] = useState([])
    // fetch movie // 
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/trending/person/day';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWNmM2I5OTQzOGFkYjJmNjliMGY0ZDcxYjg1OTQ4ZCIsInN1YiI6IjY0YzI0NTU3MWNmZTNhMGViMzBjNjVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_YRDZpynJ2zMvcvii1urYQIPAsCtB1hLeLCbmChdB0'
            }
        };

        const fetchData = async () => {
            try {
                const response = await fetch(url, options)
                const json = await response.json()
                console.log(json);
                setResults(json.results)
            } catch (error) {
                console.log('error:', error);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = (e) => {
        const search = document.getElementById('search').value;
        e.preventDefault();
        // console.log(results);

        // let i = 0;
        // let y = 0;

        // while (i < results.length) {
        //     const know_for = results[i].known_for.length;
        //     // console.log(results[i]);
        //     i++;
        //     while(y < know_for){
        //         if (search === results[i].name) {
        //             console.log(results[i].known_for);
        //             break;
        //         }else if(search === results[i].known_for[y].title){
        //             console.log(results[i].name);
        //         }else{
        //             console.log('inconu');
        //             break;
        //         }
        //         // console.log(results[i].known_for[y]);
        //         y++
        //     }
        // }

        for (let i = 0; i < results.length; i++) {
            // console.log(results[i]);
            if (search === results[i].name) {
                console.log(results[i].known_for);
                break;
            } 
            for (let y = 0; y < results[i].known_for.length; y++) {
                if (search === results[i].known_for[y].title) {
                    console.log(results[i].name);
                    // break
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' id='search' placeholder='Entrez un nom de film ou acteur' />
                <button>click me</button>
            </form>
        </div>
    )
}

export default FetchMovie
