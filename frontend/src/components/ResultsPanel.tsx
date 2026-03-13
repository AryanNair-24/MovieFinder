import React from 'react'

import type { SearchResult } from '../types';

interface ResultsPanelProps {
    result: SearchResult;
}

function ResultsPanel({ result }: ResultsPanelProps) {
    return (
        <div className="flex gap-4 mt-6 p-4 bg-gray-800 rounded-lg">
            <div>
                {result.poster 
                ? <img className="w-32 rounded" src={`https://image.tmdb.org/t/p/w500${result.poster}`} />
                : <p className='w-32'>No poster available</p>
                }
            </div>
            
            <div>
                <h1 className='text-xl font-bold'>{result.title}</h1>
                {result.platforms.map((platform) => (
                    <p className='text-sm text-gray-400' key={platform}>{platform}</p>
                ))}
            </div>
        </div>
    )
}

export default ResultsPanel
