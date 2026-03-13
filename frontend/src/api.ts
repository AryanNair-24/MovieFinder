import type { SearchResult, HistoryEntry } from "./types";

const BASE_URL = "https://moviefinder-qbor.onrender.com";

export async function searchMovie(movie: string, region: string): Promise<SearchResult> {
  const response = await fetch(`${BASE_URL}/search?movie=${encodeURIComponent(movie)}&region=${encodeURIComponent(region)}`);
  
  if (!response.ok) {
    throw new Error("Movie not found or unavailable in this region");
  }

  return response.json();
}

export async function fetchHistory(): Promise<HistoryEntry[]> {
  const response = await fetch(`${BASE_URL}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return response.json();
}
