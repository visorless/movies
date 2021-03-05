import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

import MovieCard from './components/MovieCard'
import {apikey} from './util/secret'

const URL = 'https://api.themoviedb.org/3/search/movie'
const APIKEY = `?api_key=${apikey}`
function App() {

    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState([])

    useEffect( () => {
        if(searchValue.length > 0){
            axios.get(`${URL}${APIKEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`)
            .then(response => {
                setData(response.data.results)
            })
        }
    }, [searchValue])

    const handleChange = (event) => {
        setSearchValue(event.target.value)

    }
  return (
    <div className="App">
        <h1 style={{color:'var(--dark-shade)'}}>Movie Searcher</h1>
        <input onChange={handleChange} value={searchValue} size="100" />
        <div>
            {searchValue.length > 0 ?
                `Searching for ${searchValue}...` : ''}
        </div>
        <div className="movieCardArea">
            {data.map( movie => (
                <MovieCard movieData={movie} key={movie.id} />
            ))}
        </div>
        <div className="footer">
            * api courtesy of the movie db: https://www.themoviedb.org
        </div>

    </div>
  );
}
//base url for things
//https://www.themoviedb.org/talk/568e3711c3a36858fc002384

export default App;
