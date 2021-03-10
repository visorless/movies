import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import {apikey} from '../util/secret'

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

    useEffect( () => {
        setSource(`${src}${data.backdrop_path}`)
        axios.get(`${URL}movie/${data.id}/credits${APIKEY}&language=en-US`)
        .then(response => {
            setCredits(response.data.cast)
            console.log(response)
        })
        axios.get(`${URL}movie/${data.id}/videos${APIKEY}&language=en-US`)
        .then( response => {
            console.log(response)
            setVideos(response.data.results)
        })
    }, [data])

    return (
        <div className="moviePopupBackdrop">
            <div className="moviePopup">
                <div className="moviePopupClose">
                    <button name="close" onClick={() => hide()}>X</button>
                </div>
                {source.length > 0 ?
                    <img
                        alt={`${isMovie ? data.title: data.name}_backdrop`}
                        src={source} width="500"
                        onError={() => setSource('')}/>
                    : ''
                }

                <h3>{isMovie ? data.title: data.name} {data.id}</h3>
                <h4>{isMovie ? data.release_date : data.first_air_date}</h4>
                <div>{data.overview}</div>
                <div className="popupVideos">
                    {videos.map((vid, i) => (
                        <React.Fragment>
                        {vid.site.toUpperCase() === 'YOUTUBE' ?
                            <span key={vid.key+ i}>
                                <a href={`https://youtube.com/watch?v=${vid.key}`}>
                                    Trailer {i}
                                </a>
                            </span>
                            : ''
                        }
                        </React.Fragment>
                    ))}
                </div>
                <div className="popupCredits">
                    {credits.map((person, i) => (
                        <div key={person.name + i}>{person.character.length > 0 ? `${person.character} : `: ''}{person.name}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MoviePopup
