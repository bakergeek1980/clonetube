import { useState, useEffect } from 'react';

export const useVideoHistory = () => {
  const [videoHistory, setVideoHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('videoHistory');
    if (savedHistory) {
      setVideoHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (videoId, title) => {
    const newVideo = {
      id: videoId,
      title,
      thumbnail: `https://img.youtube.com/vi/${videoId}/default.jpg`,
      timestamp: new Date().toLocaleString(),
    };

    setVideoHistory(prev => {
      const filtered = prev.filter(video => video.id !== videoId);
      const updated = [newVideo, ...filtered].slice(0, 20);
      localStorage.setItem('videoHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setVideoHistory([]);
    localStorage.removeItem('videoHistory');
  };

  return {
    videoHistory,
    addToHistory,
    clearHistory,
  };
};