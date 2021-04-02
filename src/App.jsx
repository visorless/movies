import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

import MovieCard from './components/MovieCard/MovieCard'
import Paginator from './components/Paginator/Paginator'
import TitleBar from './components/TitleBar/TitleBar'
import MoviePanel from './components/MoviePanel/MoviePanel';
import FeaturedImage from './components/FeaturedImage/FeaturedImage';





function App() {

    // const handlePage = (index) => {
    //     doSearch(index)
    // }
  return (
    <div className="App">
        <TitleBar/>
        <FeaturedImage />
        <MoviePanel type="now_playing"/>
        <MoviePanel type="popular"/>
        <MoviePanel type="upcoming"/>
        <MoviePanel type="top_rated"/>
        
        {/*<Paginator pageData={pageData} handlePage={handlePage}/>
        <div className="movieCardArea">
            {data.map( movie => (
                <MovieCard movieData={movie} key={movie.id} isMovie={isMovie}/>
            ))}
        </div>
        <Paginator pageData={pageData} handlePage={handlePage}/> */}
    </div>
  );
}
//base url for things
//https://www.themoviedb.org/talk/568e3711c3a36858fc002384

export default App;

// TODO:
// fix movie card
// fix movie panel
// better scrolls
// implement search
// click on featured image and get info