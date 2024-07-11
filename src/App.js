import React, { useState, useEffect } from 'react';
import VinylPlayer from './VinylPlayer';
import MusicService from './MusicService';
import './App.css';

const CLIENT_ID = '76467408e75d48c2bd152c17e293ed33';
const REDIRECT_URI = 'https://hemangsharma.github.io/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'user-library-read streaming';

const App = () => {
  const [token, setToken] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find(elem => elem.startsWith('access_token'))
        .split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem('token');
  };

  const changeTrack = (direction) => {
    if (direction === 'next') {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackList.length);
    } else if (direction === 'prev') {
      setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + trackList.length) % trackList.length);
    }
  };

  const currentTrack = trackList[currentTrackIndex];

  return (
    <div className="app">
      {!token ? (
        <a
          className="login-btn"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
        >
          Login to Spotify
        </a>
      ) : (
        <>
          <button onClick={logout} className="logout-btn">Logout</button>
          <MusicService token={token} setTrackList={setTrackList} />
          {currentTrack && <VinylPlayer track={currentTrack} changeTrack={changeTrack} token={token} />}
        </>
      )}
    </div>
  );
};

export default App;
