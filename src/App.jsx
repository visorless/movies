import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

import MovieCard from './components/MovieCard'
import Paginator from './components/Paginator'

import {apikey} from './util/secret'

const URL = 'https://api.themoviedb.org/3/search/movie'
const APIKEY = `?api_key=${apikey}`
function App() {

    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [pageData, setPageData] = useState({})

    useEffect( () => {
        if(searchValue.length > 0){
            setIsSearching(true)
            doSearch(1)
        }
    }, [searchValue])

    const doSearch = (page) => {
        axios.get(`${URL}${APIKEY}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`)
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
  return (
    <div className="App">
        <h1 style={{color:'var(--dark-shade)'}}>Movie Searcher</h1>
        <input onChange={handleChange} value={searchValue} size="100" />
        <div>
            {isSearching ?
                `Searching for ${searchValue}...` : 'Search for something!'}
        </div>
        <Paginator pageData={pageData} handlePage={handlePage}/>
        <div className="movieCardArea">
            {data.map( movie => (
                <MovieCard movieData={movie} key={movie.id} />
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
