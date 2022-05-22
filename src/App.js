import React from "react";
import { useState, useEffect } from "react";

import MoiveCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?apikey=ed4ff5d2';

const movie1 = {
        "Title": "Star Wars: Episode IX - The Rise of Skywalker",
        "Year": "2019",
        "imdbID": "tt2527338",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
}

useEffect(() => {
    searchMovies('star wars');
}, []);

return (
   <div className="app">
       <h1>MovieLand</h1>

       <div className="search">
           <input
               placeholder="Search for movies"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
           />
           <img src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
       </div>

       {movies?.length > 0
           ? (
               <div className="container">
                   {movies.map((movie) => (
                       <MoiveCard movie={movie}/>
                   ))}
               </div>
           ) : (
               <div className="empty">
                   <h2>No movies found</h2>
               </div>
           )}
   </div>
);
}

export default App;