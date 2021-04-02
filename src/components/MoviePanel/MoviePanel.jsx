import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import MovieCard from '../MovieCard/MovieCard'

import './MoviePanel.css'

import {apikey} from '../../util/secret'

const APIKEY = `?api_key=${apikey}`
const URL = 'https://api.themoviedb.org/3/'

const TYPES = ['top_rated','upcoming', 'popular', 'now_playing']



const MoviePanel = ({type, ...props}) => {
    const [data, setData] = useState([])
    const [pageData, setPageData] = useState(null)
    const panelRef = useRef()
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect( () => {
        if (TYPES.includes(type)){
            handleFetchByType()
        }
    }, [])

    const doSearch = (page) => {
       
        
    }

    const handleFetchByType = () => {
        axios.get(`${URL}movie/${type}${APIKEY}&language=en-US&page=1`)
        .then(response => {
            setData(response.data.results)
            setPageData({
                page: response.data.page,
                total_pages: response.data.total_pages
            })
            setIsLoaded(true)
        })
    }

    const handleScroll = (e) => {
        // TODO:
        // better left right arrows
        // max and min scroll happenings
        console.log(panelRef)
        console.log(e.currentTarget.getAttribute('name'))
       
        // get the width of the div, 
        let parentWidth = panelRef.current.clientWidth
        //divide it by the known width of children
        let numChildren = Math.floor(parentWidth / 201);
        // to find how many children are displayed
        let currScroll = panelRef.current.scrollLeft
        let newScroll
        if (e.currentTarget.getAttribute('name') == 'right'){
            newScroll = currScroll + (numChildren * 100);
        } else {
            newScroll = currScroll - (numChildren * 100);
        }
        panelRef.current.scrollTo({top: 0, left: newScroll, behavior: 'smooth' });
    }

    return(
        <div className="moviePanelContainer">
            {!isLoaded ? '' :
            <React.Fragment>
            <h2>{type.replace(/_/g,' ').toUpperCase()}</h2>
            <div className="MoviePanel" style={{display: 'flex'}} ref={panelRef}>            

                <div onClick={handleScroll} name="left"
                className="moviePanelScroll moviePanelScrollLeft">
                    <span>{'<'}</span>
                </div>
                {data?.map( movie => (
                    <MovieCard movieData={movie} key={movie.id} isMovie={true}/>
                ))}
   
                <div onClick={handleScroll} name="right" 
                className="moviePanelScroll moviePanelScrollRight">
                <span>{'>'}</span> 
                </div>
            </div>
            </React.Fragment>
            }
        </div>
    )
}
export default MoviePanel;