import { useState } from 'react';

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
        <div className="flex flex-col gap-3 mb-6">
            {/* your inputs and button go here */} 
            <input className="w-full p-2 border border-gray-600 rounded bg-gray-800 test-gray-100 focus:outline-none focus:border-gray-400"
            placeholder='Movie Title'
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            />

            <input className="w-full p-2 border border-gray-600 rounded bg-gray-800 test-gray-100 focus:outline-none focus:border-gray-400"
            placeholder='Region (e.g. CA, US, etc.)'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            />

            <button onClick={handleSubmit} className='px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 w-full'>Submit</button>

        </div>
    )
}

export default SearchBar
