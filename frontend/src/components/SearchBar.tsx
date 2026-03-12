import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (movie: string, region: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [movieName, setMovieName] = useState("")
    const [region, setRegion] = useState("")

    function handleSubmit() {
        if (movieName && region) {
            onSearch(movieName, region)
        }
    }

    return (
        <div>
            {/* your inputs and button go here */} 
            <input
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            />

            <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>

        </div>
    )
}

export default SearchBar

/*
const MovieName: React.FC = () => {
    // Define a state variable of type number with an initial value of 0
    const [movie_name, setMovieName] = useState<string>("");
 
    const set_name = () => {
        setMovieName(movie_name);
    };
 
    return (
        <div>
            <p>Movie Name: {movie_name}</p>
            <button onClick={setMovieName}>Submit</button>
        </div>
    );
};
*/
