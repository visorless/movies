import React, {useState, useEffect} from 'react';

import MoviePopup from './MoviePopup'
import useModal from '../hooks/useModal'

const MovieCard = ({movieData, isMovie, ...props}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [src, setSrc] = useState('')
    const [fallBackSrc, setFallBackSrc] = useState('')
    const {isShowing, toggle} = useModal();

    useEffect( () => {
        setSrc(`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movieData.poster_path}`)
        setFallBackSrc(`https://via.placeholder.com/185x278.png?text=${isMovie ? movieData.title : movieData.name}`)
    }, [movieData])

    return(
        <div className="movieCard" onClick={toggle}>
            <img
                width="185"
                alt={isMovie ? movieData.title : movieData.name}
                onLoad={ () => setIsLoaded(true)}
                onError={() => setSrc(fallBackSrc)}
                style={isLoaded ? {} : {display:'none'}}
                src={src} />
            <img
                width="185"
                alt="placeholder"
                style={isLoaded ? {display:'none'} : {}}
                src="/185x278.png" />
            <span style={{padding: '0.5em'}}>Released: {movieData.release_date}</span>
            <progress value={movieData.vote_average/10} />
            <MoviePopup data={movieData} isShowing={isShowing} hide={toggle} isMovie={isMovie}/>
        </div>
    )
}

export default MovieCard;
