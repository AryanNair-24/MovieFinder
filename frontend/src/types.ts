export interface SearchResult {
  title: string;
  poster: string | null;
  region: string;
  platforms: string[];
}

export interface HistoryEntry {
  id: number;
  movie: string;
  region: string;
  platforms: string;   // this is a comma-separated string, not an array
  searched_at: string;
}
