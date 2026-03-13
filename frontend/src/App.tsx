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
    const [refreshHistory, setRefreshHistory] = useState<number>(0);


    async function handleSearch(movie: string, region: string) {
        setLoading(true)
        setErrorMessage(null)

        // catching and handling errors
        try {
            const result = await searchMovie(movie, region)
            setSearchResult(result)
            setRefreshHistory(prev => prev + 1)
        } catch(err) {
            setErrorMessage(err instanceof Error ? err.message: "Something went wrong")
        } finally {
            setLoading(false)
        }
  }

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-white text-gray-900"}>

        <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h1>Stream Finder</h1>
            <button onClick={() => {setDarkMode(!darkMode)}}>Toggle Theme</button>
        </div>

        <div className="flex p-4 gap-6">

            <div className="flex-1">
                <SearchBar onSearch={handleSearch}/>

                {loading && <p>Loading...</p>}
                {errorMessage && <p>{errorMessage}</p>}
                {searchResult && <ResultsPanel result={searchResult} />}
            </div>
            
            <div className="w-80">
                <SearchHistory refreshHistory={refreshHistory} />
            </div>

        </div>

    </div>
  )

}

export default App
