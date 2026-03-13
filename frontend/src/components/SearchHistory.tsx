import { useState, useEffect } from "react";
import { fetchHistory } from "../api";
import type { HistoryEntry } from "../types";

interface SearchHistory {
    refreshHistory: number;
}

function SearchHistory({ refreshHistory }: SearchHistory) {
    const [history, setHistory] = useState<HistoryEntry[]>([])  // history state variable

    useEffect(() => {
        async function loadHistory() {
            const data = await fetchHistory()
            setHistory(data)
        }
        loadHistory()
    }, [refreshHistory])

    return (
        <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Past Searches</h2>
            {history.map(entry => (<div className="border-b border-gray-700 py-2"
                                    key={entry.id}>
                                        <div className="flex justify-between gap-2">
                                            <span className="text-sm font-medium">{entry.movie}</span>
                                            <span className="text-xs text-gray-400">{entry.region.toUpperCase()}</span>
                                        </div>
                                        <p className="text-xs text-gray-400">{entry.platforms}</p>
                                        <p className="text-xs text-gray-600">{new Date(entry.searched_at).toLocaleDateString()}</p>
                                    </div>))}
        </div>
    );
}

export default SearchHistory;
