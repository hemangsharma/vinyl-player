import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import SpotifyPlayer from 'react-spotify-web-playback';
import './VinylPlayer.css';

const VinylPlayer = ({ track, changeTrack, token }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  useEffect(() => {
    if (track) {
      document.body.style.backgroundImage = `url(${track.album.images[0].url})`;
    }
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [track]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => changeTrack('next'),
    onSwipedRight: () => changeTrack('prev'),
  });

  return (
    <div className="vinyl-player" {...swipeHandlers}>
      <div className={`vinyl-record ${isPlaying ? 'spinning' : ''}`}>
        <img src={track.album.images[0].url} alt="Vinyl Cover" className="vinyl-cover" />
      </div>
      <div className="arm"></div>
      {isLandscape ? (
        <div>Swipe to change tracks</div>
      ) : (
        <div>
          <button onClick={() => changeTrack('prev')}>Previous</button>
          <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={() => changeTrack('next')}>Next</button>
        </div>
      )}
      <SpotifyPlayer
        token={token}
        uris={[track.uri]}
        play={isPlaying}
        callback={(state) => {
          if (!state.isPlaying) setIsPlaying(false);
        }}
        styles={{
          activeColor: '#1DB954',
          bgColor: '#333',
          color: '#fff',
          loaderColor: '#1DB954',
          sliderColor: '#1DB954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  );
};

export default VinylPlayer;
