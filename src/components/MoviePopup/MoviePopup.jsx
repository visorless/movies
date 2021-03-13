import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import MovieCard from '../MovieCard/MovieCard'
import './MoviePopup.css'

import {apikey} from '../../util/secret'
import {MOVIE_GENRES, TV_GENRES} from '../../util/consts'

const src = 'https://image.tmdb.org/t/p/w500'
const URL = 'https://api.themoviedb.org/3/'
const APIKEY = `?api_key=${apikey}`

//`https://via.placeholder.com/500x278.png?text=${isMovie ? data.title : data.name}`


const MoviePopup = ({data, isShowing, hide, isMovie}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment >
        <MPopup data={data} isMovie={isMovie} hide={hide}/>
    </React.Fragment>, document.body
) : null;

const MPopup = ({hide, data, isMovie}) => {
    const [source, setSource] = useState('')
    const [credits, setCredits] = useState([])
    const [videos, setVideos] = useState([])
    const [similar, setSimilar] = useState([])
    const [recommend, setRecommend] = useState([])

    useEffect( () => {
        setSource(`${src}${data.backdrop_path}`)
        axios.get(`${URL}${isMovie ? 'movie': 'tv'}/${data.id}/credits${APIKEY}&language=en-US`)
        .then(response => {
            setCredits(response.data.cast)
        })
        axios.get(`${URL}${isMovie ? 'movie': 'tv'}/${data.id}/videos${APIKEY}&language=en-US`)
        .then( response => {
            setVideos(response.data.results)
        })
        axios.get(`${URL}${isMovie ? 'movie': 'tv'}/${data.id}/similar${APIKEY}&language=en-US`)
        .then( response => {
            setSimilar(response.data.results)
        })
        axios.get(`${URL}${isMovie ? 'movie': 'tv'}/${data.id}/recommendations${APIKEY}&language=en-US`)
        .then( response => {
            setRecommend(response.data.results)
        })
    }, [])

    return (
        <div className="popupBackdrop">
            <div className="popup">
                <div className="popupHeader">
                    <h2>{isMovie ? data.title: data.name}</h2>
                    <button name="close" onClick={() => hide()}>X</button>
                </div>
                <div className="popupBody">
                    <div className="popupImageInfo">
                        <div className="popUpImageInfoCol">
                            {source.length > 0 ?
                                <img
                                    alt={`${isMovie ? data.title: data.name}_backdrop`}
                                    src={source} width="500"
                                    onError={() => setSource('')}/>
                                : ''
                            }
                        </div>
                        
                        <div className="popUpImageInfoCol" style={{textAlign: 'center'}}>
                            <h4>
                                {isMovie ?
                                    `Release date: ${data.release_date}`
                                    : `Air Date: ${data.first_air_date}`
                                }
                            </h4>
                                
                            <div style={{flexGrow: 1}}>
                                {data.genre_ids.map(gid => 
                                    <div key={gid}>
                                        {isMovie ?
                                            MOVIE_GENRES[gid] : TV_GENRES[gid]
                                        }
                                    </div>  
                                )}
                            </div>
                            {videos.map((vid, i) => (
                            <React.Fragment>
                            {vid.site.toUpperCase() === 'YOUTUBE' ?
                                <div key={vid.key+ i}>
                                    <a href={`https://youtube.com/watch?v=${vid.key}`}>
                                        Trailer {i}
                                    </a>
                                </div>
                                : ''
                            }
                            </React.Fragment>
                            ))}
                        </div>
                        
                    </div>
                    <div className="popupBottomHalf">
                        <div>{data.overview}</div>
                        <div className="popupVideos">
                            
                        </div>
                        <div className="popupCredits">
                            {credits.map((person, i) => (
                                <div key={person.name + i}>{person.character.length > 0 ? `${person.character} : `: ''}{person.name}</div>
                            ))}
                        </div>
                        <div className="popupSimilar" >
                            <h4>Similar Titles</h4>
                            <div className="popupSimilarCards">
                                {similar.map( movie => (
                                    <MovieCard movieData={movie} key={movie.id} isMovie={isMovie}/>
                                ))}
                            </div>
                        </div>
                        <div className="popupSimilar" >
                            <h4>You might also like</h4>
                            <div className="popupSimilarCards">
                                {recommend.map( movie => (
                                    <MovieCard movieData={movie} key={movie.id} isMovie={isMovie}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MoviePopup
