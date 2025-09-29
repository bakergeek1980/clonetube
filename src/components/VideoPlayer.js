import React from 'react';

const VideoPlayer = ({ video, onDownloadClick }) => {
  if (!video) {
    return (
      <div className="video-container">
        <div className="video-placeholder">
          <span className="material-icons">play_circle_outline</span>
          <p>Aucune vidéo sélectionnée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <iframe
          id="video-player"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          frameBorder="0"
          allowFullScreen
          title={video.title}
        />
      </div>
      
      <div className="video-info">
        <h2 className="video-title">{video.title}</h2>
        
        <div className="video-actions">
          {/* ... autres boutons ... */}
          
          {/* Bouton Télécharger - IMPORTANT: bien appeler onDownloadClick */}
          <button 
            className="action-button download-button" 
            onClick={() => onDownloadClick(video)}  // ← ICI
          >
            <span className="material-icons">download</span>
            <span>Télécharger</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;