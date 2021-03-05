import React, {useState, useEffect} from 'react';

const MovieCard = ({movieData, ...props}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [src, setSrc] = useState('')
    const [fallBackSrc, setFallBackSrc] = useState('')

    useEffect( () => {
        setSrc(`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieData.poster_path}`)
        setFallBackSrc(`https://via.placeholder.com/185x278.png?text=${movieData.title}`)
    }, [movieData])
    return(
        <div className="movieCard">
            <img
                width="185"
                onLoad={ () => setIsLoaded(true)}
                onError={() => setSrc(fallBackSrc)}
                style={isLoaded ? {} : {display:'none'}}
                src={src} />
            <img
                width="185"
                style={isLoaded ? {display:'none'} : {}}
                src="/185x278.png" />
            <span style={{padding: '0.5em'}}>Released: {movieData.release_date}</span>
            <progress value={movieData.vote_average/10} />
        </div>
    )
}

export default MovieCard;
