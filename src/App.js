import './App.css';
import {GetGiphyData} from "./components/GetGiphyData";
import RandomColor from "./components/RandomColor";
import { useState, useEffect } from 'react';

function App() {
  const [clickedGifs, setClickedGifs] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const {gifs, isLoading, error} = GetGiphyData();

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  const handleClick = (gifId) => {
    if (clickedGifs.has(gifId)) {
      setClickedGifs(new Set());
      setScore(0);
      setRefreshKey(prev => prev + 1);
    } else {
      setClickedGifs(new Set(clickedGifs).add(gifId));
      setScore(previous => previous + 1);
    }
  }

  const randomizeGifs = array => {
    let currIndex = array.length, randomIndex;
    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex--;
      [array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]]; //switch places
    }
    return array;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const randomizedGifs = randomizeGifs([...gifs]);

  return (
      <div>
        <div className="score-board">
          <h2>Score: {score}</h2>
          <h2>Best Score: {bestScore}</h2>
        </div>
        <div className="game-container">
          {randomizedGifs.map((gif, index) => (
              <div
                  key={`${gif.id}-${refreshKey}`}
                  className="gif-container"
                  style={{backgroundColor: RandomColor()}}
                  onClick={() => handleClick(gif.id)}
              >
                <img src={gif.images.fixed_height.url} alt={gif.title}/>
                <p>{gif.title.split("GIF")[0].trim()}</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
