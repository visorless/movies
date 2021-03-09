import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

import MovieCard from './components/MovieCard'
import Paginator from './components/Paginator'

import {apikey} from './util/secret'

const URL = 'https://api.themoviedb.org/3/search/'
const APIKEY = `?api_key=${apikey}`
function App() {

    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [pageData, setPageData] = useState({})
    const [isAdult, setIsAdult] = useState(false)
    const [isMovie, setIsMovie] = useState(true)

    useEffect( () => {
        if(searchValue.length > 0){
            setIsSearching(true)
            doSearch(1)
        } else{
            setData([])
            setPageData({})
        }
    }, [searchValue])

    useEffect( () => {
        if(searchValue.length > 0){
            setIsSearching(true)
            doSearch(1)
        }
    }, [isAdult, isMovie])

    const doSearch = (page) => {
        axios.get(`${URL}${isMovie ? 'movie' : 'tv'}${APIKEY}&language=en-US&query=${searchValue}&page=${page}&include_adult=${isAdult}`)
        .then(response => {
            setData(response.data.results)
            setIsSearching(false)
            setPageData({
                page: response.data.page,
                total_pages: response.data.total_pages
            })
        })
    }

    const handleChange = (event) => {
        setSearchValue(event.target.value)

    }

    const handlePage = (index) => {
        doSearch(index)
    }
    const handleCheck = (e) => {
        if(e.target.name === 'adult'){
            setIsAdult(!isAdult)
        } else if (e.target.name === 'movies'){
            setIsMovie(!isMovie)
        }

    }

  return (
    <div className="App">

        <h1 style={{color:'var(--dark-shade)'}}>Movie Searcher</h1>
        <div>
            <input type="checkbox" value={setIsAdult} onChange={handleCheck} name="adult"/> Adult?
            <button onClick={handleCheck} name="movies"> {isMovie ? 'TV Shows' : 'Movies'}? </button>
        </div>
        <input onChange={handleChange} value={searchValue} size="100" />
        <div>
            {isSearching ?
                `Searching for ${searchValue}...` : 'Search for something!'}
        </div>
        <Paginator pageData={pageData} handlePage={handlePage}/>
        <div className="movieCardArea">
            {data.map( movie => (
                <MovieCard movieData={movie} key={movie.id} isMovie={isMovie}/>
            ))}
        </div>
        <Paginator pageData={pageData} handlePage={handlePage}/>
        <div className="footer">
            * api courtesy of the movie db: https://www.themoviedb.org
        </div>

    </div>
  );
}
//base url for things
//https://www.themoviedb.org/talk/568e3711c3a36858fc002384

export default App;
