// src/components/Settings.js
import React from 'react';

const Settings = ({ setService }) => {
  return (
    <div>
      <button onClick={() => setService('spotify')}>Spotify</button>
    </div>
  );
};

export default Settings;
