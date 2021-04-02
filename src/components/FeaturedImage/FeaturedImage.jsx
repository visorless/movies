import { useEffect, useState } from "react";
import axios from 'axios'
import {apikey} from '../../util/secret'

import './FeaturedImage.css'

const APIKEY = `?api_key=${apikey}`
const URL = 'https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,2b2e4a,e84545)/'

const fetchFeatured = async () => {
    let random = Math.round(Math.random()*20)
    let featured = `https://api.themoviedb.org/3/movie/now_playing${APIKEY}&language=en-US&page=1`
    const result = await axios.get(featured)
    return result.data.results[random]
}

const fetchFeaturedImage = async (movieID) => {
    let image = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/images${APIKEY}&language=en-US&include_image_language=en`)
    if (image.data.backdrops.length > 0){
        let random = Math.floor(Math.random()*image.data.backdrops.length)
        return image.data.backdrops[random].file_path
    } else {
        return null
    }
    
}

const FeaturedImage = () => {
    const [movieTitle, setMovieTitle] = useState('')
    const [src, setSrc] = useState('')
    // const [prog, setProg] = useState(1)

    useEffect( () => {
        // load an image
        handleLoadFeaturedImage()
        const interval = setInterval(() => {
            // and load a different image every 5 seconds
            handleLoadFeaturedImage()
        }, 5000);
     
        // on unmount, clear timer
        return () => {
            clearInterval(interval);
            // clearInterval(progInterval)
        };
    }, [])

    const handleLoadFeaturedImage = () => {
        fetchFeatured()
        .then(result => {
            if (result){
                const title = result.original_title
                
                fetchFeaturedImage(result.id)
                .then(result => {
                    if (result) {
                        setMovieTitle(title)
                        //setSrc(`https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,2b2e4a,e84545)${result}`)
                        setSrc(`https://www.themoviedb.org/t/p/original${result}`)
                    }                    
                })
            }            
        })
    }
   
{/*     <progress value={prog} max="100"/> */}
    return (
        <div
            className="featuredImage" style={src ? {
            backgroundImage:`url('${src}')`
        } : {}}>
            <h2>{movieTitle}</h2>
            
        </div>
    )

}

// TODO: onclick the image to load a movie card
export default FeaturedImage;