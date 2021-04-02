import React, {useState} from "react"
import axios from 'axios'

import './TitleBar.css'

import {apikey} from '../../util/secret'
const APIKEY = `?api_key=${apikey}`
const URL = 'https://api.themoviedb.org/3/search/'


const TitleBar = ({...props}) => {
    const [isAdult, setIsAdult] = useState(false)
    const [isMovie, setIsMovie] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [, setIsSearching] = useState(false)    
    const [data, setData] = useState([])   
    const [pageData, setPageData] = useState({}) 


    const handleChange = (event) => {
        let val = event.target.value
        setSearchValue(val)
        if(val.length > 0){
            setIsSearching(true)
            doSearch(1)
        } else{
            setData([])
            setPageData({})
        }
    }

    const handleCheck = (e) => {
        if(e.target.name === 'adult'){
            setIsAdult(!isAdult)
        } else if (e.target.name === 'movies'){
            setIsMovie(!isMovie)
        }
        if(searchValue.length > 0){
            setIsSearching(true)
            doSearch(1)
        }
    }



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

    return (
        <div className="titleBar">
            <div className="titleBarTitle">Movies</div>
            <div className="titleBarThing">
            * api courtesy of the movie db: https://www.themoviedb.org
            </div>
            <span className="titleBarThing">
                <input type="checkbox" value={setIsAdult} onChange={handleCheck} name="adult"/> Adult
                <input type="checkbox" value={setIsMovie} onChange={handleCheck} name="movies"/> TV
                <input onChange={handleChange} value={searchValue} placeholder="Movie or TV Titles"/>              
            </span>
        </div>
    )
}

export default TitleBar;