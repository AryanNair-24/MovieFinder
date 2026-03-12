import React from 'react'

import type { SearchResult } from '../types';

interface ResultsPanelProps {
    result: SearchResult;
}

function ResultsPanel({ result }: ResultsPanelProps) {
    return (
        <div>
            <h1>{result.title}</h1>
            {result.poster 
                ? <img src={`https://image.tmdb.org/t/p/w500${result.poster}`} />
                : <p>No poster available</p>
            }
            {result.platforms.map((platform) => (
                <p key={platform}>{platform}</p>
            ))}
        </div>
    )
}

export default ResultsPanel
