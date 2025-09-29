import React from 'react';

const HistorySidebar = ({ history, onVideoSelect, onClearHistory }) => {
  return (
    <div className="sidebar">
      <div className="history-section">
        <div className="history-header">
          <h3>Historique de visionnage</h3>
          {history.length > 0 && (
            <button className="clear-history" onClick={onClearHistory}>
              Effacer tout
            </button>
          )}
        </div>
        
        <div className="history-list">
          {history.length === 0 ? (
            <p className="empty-history">Aucune vidéo dans l'historique</p>
          ) : (
            history.map((video, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => onVideoSelect(video.id, video.title)}
              >
                <div 
                  className="history-thumbnail"
                  style={{ 
                    backgroundImage: `url(https://img.youtube.com/vi/${video.id}/default.jpg)` 
                  }}
                ></div>
                <div className="history-info">
                  <div className="history-video-title">{video.title}</div>
                  <div className="history-channel">
                    Regardé le {video.timestamp}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySidebar;