import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const URL = "https://hacker-news.firebaseio.com/v0/topstories.json";

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => response.data.slice(0, 100))
      .then((storyIds) =>
        Promise.all(
          storyIds.map((storyId) =>
            axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
            )
          )
        )
      )
      .then((responses) => responses.map((response) => response.data))
      .then((stories) => setStories(stories));
  }, []);

  return (
    <div className="App">
      <h1>Construx Times</h1>
      <h2>View the top 100 articles from Hacker News!</h2>
      <ol>
        {stories.map((story) => (
          <li key={story.id}>
            <a href={story.url} target="_blank" rel="noreferrer">
              {story.title}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
