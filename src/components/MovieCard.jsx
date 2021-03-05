import React, {useState, useEffect} from 'react';

const MovieCard = ({movieData, ...props}) => {
    const [loaded, isLoaded] = useState(false)
    const [src, setSrc] = useState('')

    useEffect( () => {
        setSrc(`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieData.poster_path}`)
    }, [movieData])
    return(
        <div className="movieCard">
            {src.length == 0 ? <h4>{movieData.title}</h4> : ''}
            <img
                width="185"
                onLoad={ () => isLoaded(true)}
                onError={() => setSrc('')}
                style={isLoaded ? {} : {display:'none'}}
                src={src} />
            <span style={{padding: '0.5em'}}>Released: {movieData.release_date}</span>
            <progress value={movieData.vote_average/10} />
        </div>
    )
}

export default MovieCard;
