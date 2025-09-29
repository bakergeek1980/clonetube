import React from 'react';

const DownloadsModal = ({ videos, onClose, onRefresh, isOpen }) => {
  if (!isOpen) return null;

  const playVideo = (filename) => {
    const videoUrl = `http://localhost:3001/api/video/${encodeURIComponent(filename)}`;
    window.open(videoUrl, '_blank');
  };

  const deleteFile = async (filename) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${filename}" ?`)) {
      try {
        const response = await fetch(`http://localhost:3001/api/downloads/${encodeURIComponent(filename)}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          onRefresh();
        } else {
          alert('❌ Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('❌ Erreur suppression:', error);
        alert('❌ Impossible de supprimer le fichier');
      }
    }
  };

  const downloadFile = (filename) => {
    const downloadUrl = `http://localhost:3001/api/video/${encodeURIComponent(filename)}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-header-text">
            <h3>
              <span className="material-icons">folder</span>
              Vidéos Téléchargées
              <span className="modal-header-count">{videos.length}</span>
            </h3>
            <p>Gérer et visionner vos téléchargements</p>
          </div>
          <div className="modal-header-actions">
            <button onClick={onRefresh}>
              <span className="material-icons">refresh</span>
              Actualiser
            </button>
            <button onClick={onClose} className="modal-close-button">×</button>
          </div>
        </div>

        <div className="modal-body">
          {videos.length === 0 ? (
            <div className="modal-empty-state">
              <div className="icon">📁</div>
              <h4>Aucune vidéo téléchargée</h4>
              <p>Les vidéos que vous téléchargez apparaîtront ici.</p>
            </div>
          ) : (
            <div className="downloads-list">
              {videos.map((video, index) => (
                <div key={index} className="download-item">
                  <div className="download-item-info">
                    <div className="download-item-filename">{video.filename}</div>
                    <div className="download-item-details">
                      <span>📦 {video.size}</span>
                      <span>📅 {video.date}</span>
                      <span className={video.type === 'audio' ? 'download-item-type-audio' : 'download-item-type-video'}>
                        {video.type === 'audio' ? '🎵 Audio' : '🎬 Vidéo'}
                      </span>
                    </div>
                  </div>
                  <div className="download-item-actions">
                    <button onClick={() => playVideo(video.filename)} className="btn-play">▶️ Lire</button>
                    <button onClick={() => downloadFile(video.filename)} className="btn-download">⬇️ Télécharger</button>
                    <button onClick={() => deleteFile(video.filename)} className="btn-delete">🗑️ Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <strong>Emplacement :</strong> server/downloads/
        </div>
      </div>
    </div>
  );
};

export default DownloadsModal;