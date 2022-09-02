import React, { useState } from 'react'
import {  useEffect } from 'react'

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=14e2dd20';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // fetch data
    const searchMovies = async (title) => {
        const resposne = await fetch(`${API_URL}&s=${title}`);
        const data = await resposne.json();

        setMovies(data.Search);
    }

  useEffect( () => {
    searchMovies('batman');
  }, []);
  
  return (
    <div className='app'>
        <h1>MovieFlix</h1>

        <div className='search'>
            <input
                placeholder='Search for Movies'
                value={searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt = 'Search'
                onClick = {() => searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length>0
            ? (
                <div className='container'>
                    {
                        movies.map( (movie) => (
                            <MovieCard movie = {movie}/>
                        ))
                    }
                    <MovieCard movie = {movies[0]}/>
                </div>
            ) :
            (
                <div className='empty'>
                    <h2>No Movies Found</h2>
                </div>
            )
        }

    </div>
  )
}

export default App