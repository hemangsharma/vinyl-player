import React, { useEffect } from 'react';
import axios from 'axios';

const MusicService = ({ token, setTrackList }) => {
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await axios.get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrackList(tracks.data.items.map(item => item.track));
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    if (token) {
      fetchTracks();
    }
  }, [token, setTrackList]);

  return <div>Loading...</div>;
};

export default MusicService;
