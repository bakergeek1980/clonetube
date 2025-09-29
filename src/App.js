import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import UrlImport from './components/UrlImport';
import RealDownloadModal from './components/RealDownloadModal';
import DownloadsModal from './components/DownloadsModal';
import HistorySidebar from './components/HistorySidebar';
import { useVideoHistory } from './hooks/useVideoHistory';
import './styles/App.css';

function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showDownloadsModal, setShowDownloadsModal] = useState(false);
  const [downloadedVideos, setDownloadedVideos] = useState([]);
  const { videoHistory, addToHistory, clearHistory } = useVideoHistory();
  
  useEffect(() => {
    fetchDownloadedVideos();
  }, []);

  const fetchDownloadedVideos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/downloads');
      if (response.ok) {
        const videos = await response.json();
        setDownloadedVideos(videos);
      }
    } catch (error) {
      console.error('Erreur chargement vidéos:', error);
    }
  };

  const handleVideoLoad = (videoId, title) => {
    const videoData = { id: videoId, title };
    setCurrentVideo(videoData);
    addToHistory(videoId, title);
  };

  const handleDownloadClick = () => {
    if (currentVideo) {
      setShowDownloadModal(true);
    }
  };

  const handleShowDownloads = () => {
    fetchDownloadedVideos();
    setShowDownloadsModal(true);
  };

  return (
    <div className="app">
      <Header onShowDownloads={handleShowDownloads} />
      
      <main className="main-container">
        <div className="main-content">
          <VideoPlayer 
            video={currentVideo} 
            onDownloadClick={handleDownloadClick}
          />
          <UrlImport onVideoLoad={handleVideoLoad} />
        </div>
        
        <aside className="sidebar-content">
          <HistorySidebar 
            history={videoHistory}
            onVideoSelect={handleVideoLoad}
            onClearHistory={clearHistory}
          />
        </aside>
      </main>

      {showDownloadModal && currentVideo && (
        <RealDownloadModal
          videoId={currentVideo.id}
          videoTitle={currentVideo.title}
          onClose={() => setShowDownloadModal(false)}
          isOpen={showDownloadModal}
        />
      )}

      {showDownloadsModal && (
        <DownloadsModal
          videos={downloadedVideos}
          onClose={() => setShowDownloadsModal(false)}
          onRefresh={fetchDownloadedVideos}
          isOpen={showDownloadsModal}
        />
      )}
    </div>
  );
}

export default App;