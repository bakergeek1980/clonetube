import React, { useState } from 'react';
import ytDlpService from '../services/ytDlpService'; // Assurez-vous que le chemin est correct

const UrlImport = ({ onVideoLoad }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (input) => {
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
      /^[a-zA-Z0-9_-]{11}$/
    ];
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const videoId = extractVideoId(query);

    if (videoId) {
      onVideoLoad(videoId, `Vidéo importée (${videoId})`);
      setQuery('');
      setSearchResults([]);
    } else {
      setIsLoading(true);
      try {
        const results = await ytDlpService.searchVideos(query);
        setSearchResults(results.items || []);
      } catch (err) {
        setError("Erreur lors de la recherche. Vérifiez la clé d'API sur le serveur.");
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVideoSelect = (video) => {
    onVideoLoad(video.id.videoId, video.snippet.title);
    setSearchResults([]);
    setQuery('');
  };

  return (
    <div className="url-import">
      <h3>
        <span className="material-icons">search</span>
        Recherche & Import
      </h3>
      <form onSubmit={handleSearchSubmit}>
        <div className="url-input-container">
          <input
            type="text"
            className="url-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Collez une URL YouTube, un ID, ou recherchez..."
          />
          <button type="submit" className="import-button" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Importer'}
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {searchResults.length > 0 && (
        <div className="history-list" style={{ marginTop: '15px' }}>
          {searchResults.map((video) => (
            <div
              key={video.id.videoId}
              className="history-item"
              onClick={() => handleVideoSelect(video)}
            >
              <img
                className="history-thumbnail"
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
              />
              <div className="history-info">
                <div className="history-video-title">{video.snippet.title}</div>
                <div className="history-channel">{video.snippet.channelTitle}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlImport;