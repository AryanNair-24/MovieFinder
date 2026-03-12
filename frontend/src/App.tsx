import React from 'react'
import SearchBar from './components/SearchBar'


function App() {

  function handleSearch(movie: string, region: string) {
    console.log(movie, region)
  }

  return (
    <div>Stream Finder
        <SearchBar onSearch={handleSearch}/>
    </div>
  )
}

export default App
