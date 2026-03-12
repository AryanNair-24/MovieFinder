import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (movie: string, region: string) => void;
}

// searchBar component
function SearchBar({ onSearch }: SearchBarProps) {
    const [movieName, setMovieName] = useState("")  // movieName state variable
    const [region, setRegion] = useState("")  // region state variable

    function handleSubmit() {
        if (movieName && region) {
            onSearch(movieName, region)
        }
    }

    // jsx
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
