import SearchBar from './components/SearchBar'
import ResultsPanel from './components/ResultsPanel'
import SearchHistory from './components/SearchHistory'
import { useState } from 'react'
import type { SearchResult } from './types'
import { searchMovie } from './api'


function App() {
    
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState<boolean>(true);


    async function handleSearch(movie: string, region: string) {
        setLoading(true)
        setErrorMessage(null)

        // catching and handling errors
        try {
            const result = await searchMovie(movie, region)
            setSearchResult(result)
        } catch(err) {
            setErrorMessage(err instanceof Error ? err.message: "Something went wrong")
        } finally {
            setLoading(false)
        }
  }

  return (
    <div>
        <h1>Stream Finder</h1>
        <button onClick={() => {setDarkMode(!darkMode)}}>Toggle Theme</button>

        <div className="flex">
            <div>
                <SearchBar onSearch={handleSearch}/>

                {loading && <p>Loading...</p>}
                {errorMessage && <p>{errorMessage}</p>}
                {searchResult && <ResultsPanel result={searchResult} />}
            </div>
            
            <div>
                <SearchHistory />
            </div>

        </div>

    </div>
  )

}

export default App
