import httpx
import os
import dotenv
import sqlite3
import datetime
from typing import Annotated

from fastapi import FastAPI, HTTPException, Query

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://movie-finder-git-main-aryannair-24s-projects.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def set_up_db_connection():
    con = sqlite3.connect("streamfinder.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS searches(id INTEGER PRIMARY KEY AUTOINCREMENT, movie TEXT, region TEXT, results TEXT, searched_at TEXT);")
    con.commit()
    con.close()

set_up_db_connection()

dotenv.load_dotenv()

# Access environment variables
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")


@app.get("/search")
def search(movie: str, region: str):

    # Stage 1
    response = httpx.get(
    "https://api.themoviedb.org/3/search/movie",
    params={"api_key": TMDB_API_KEY, "query": movie},
    timeout=10.0
    )
    
    results = response.json()["results"]
    
    if not results:
        raise HTTPException(status_code=404, detail="Movie not found")

    first_result = results[0]
    movie_id = first_result["id"]
    movie_title = first_result["title"]
    movie_poster = first_result.get("poster_path", None)
    
    # movie_details = (response[0].id, response[0].title, response[0].poster_path)  # check this for correctness

    # Stage 2
    print(f"Movie ID being sent: {movie_id}")  # for debugging purposes
    streaming_response = httpx.get(f"https://streaming-availability.p.rapidapi.com/shows/movie/{movie_id}",
    headers={
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
    },
    params={"country": region.lower()},
    timeout = 10.0)
    
    streaming_data = streaming_response.json()
    print(streaming_data.get("streamingOptions", {}))  # for debugging
    streaming_options = streaming_data.get("streamingOptions", {}).get(region.lower(), [])
    platform_names = list(set(option["service"]["name"] for option in streaming_options))

    # Stage 3
    # movie_name = movie_details[1]
    # current_timestamp = 0  # figure out how to get the current timestamp
    
    con = sqlite3.connect("streamfinder.db")
    cur = con.cursor()
    current_timestamp = datetime.datetime.now().isoformat()
    platforms_str = ", ".join(platform_names)  # convert list to a string for storage

    cur.execute(
    "INSERT INTO searches (movie, region, results, searched_at) VALUES (?, ?, ?, ?);",
    (movie_title, region, platforms_str, current_timestamp))

    con.commit()
    con.close()

    return{
        "title": movie_title,
        "poster": movie_poster,
        "region": region,
        "platforms": platform_names
    }
    
    # else:
    #     raise HTTPException(staus_code=404, detail="Movie not found")


@app.get("/history")
def history():
    con = sqlite3.connect("streamfinder.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM searches ORDER BY searched_at DESC;")
    rows = cur.fetchall()
    con.close()
    return [
    {"id": r[0], "movie": r[1], "region": r[2], "platforms": r[3], "searched_at": r[4]}
    for r in rows
]
