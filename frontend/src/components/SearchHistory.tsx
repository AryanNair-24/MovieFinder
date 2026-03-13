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
        <div>
            {history.map(entry => (<p key={entry.id}>{entry.movie} | {entry.region} | {entry.platforms} | {entry.searched_at}</p>))}
        </div>
    );
}

export default SearchHistory;
