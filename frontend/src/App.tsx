import SearchBar from './components/SearchBar'
import { useState } from 'react'
import type { SearchResult } from './types'
import { searchMovie } from './api'


function App() {
    
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


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
    <div>Stream Finder
        <SearchBar onSearch={handleSearch}/>

        {loading && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {searchResult && <p>{searchResult.title}</p>}

    </div>
  )
}

export default App
