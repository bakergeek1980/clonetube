import React, { useState } from 'react';

const RealDownloadModal = ({ videoId, videoTitle, onClose, isOpen }) => {
  const [selectedFormat, setSelectedFormat] = useState('best');
  const [downloadSubtitles, setDownloadSubtitles] = useState(false);

  const handleDownload = async () => {
    console.log('🟡 Début handleDownload pour:', videoId);
    
    try {
     const response = await fetch('https://tubeclone-server.onrender.com/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `https://www.youtube.com/watch?v=${videoId}`,
          format: selectedFormat,
          downloadSubtitles: downloadSubtitles
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Succès API:', result);
        alert('✅ Téléchargement démarré !');
      } else {
        console.error('❌ Erreur HTTP:', response.status);
        alert('❌ Erreur lors du téléchargement');
      }
    } catch (error) {
      console.error('❌ Erreur fetch:', error);
      alert('❌ Impossible de contacter le serveur');
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  const formatOptions = [
    { 
      id: 'best', 
      label: '🎯 Meilleure qualité', 
      desc: '1080p/4K - Vidéo + Audio',
      size: 'Taille variable',
      color: '#ff6b6b'
    },
    { 
      id: '720', 
      label: '🖼️ HD 720p', 
      desc: 'Équilibre qualité/taille',
      size: '~100-500MB',
      color: '#4ecdc4'
    },
    { 
      id: '480', 
      label: '📺 SD 480p', 
      desc: 'Qualité standard',
      size: '~50-200MB',
      color: '#45b7d1'
    },
    { 
      id: 'mp3', 
      label: '🎵 Audio MP3', 
      desc: 'Audio seulement',
      size: '~5-20MB',
      color: '#96ceb4'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#1e1e1e',
        padding: 'clamp(20px, 4vw, 30px)',
        borderRadius: '16px',
        width: 'min(500px, 95vw)',
        maxHeight: '90vh',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid #333',
        color: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* En-tête responsive */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          borderBottom: '1px solid #333',
          paddingBottom: '15px',
          flexShrink: 0,
          gap: '15px'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ 
              margin: 0, 
              color: 'white',
              fontSize: 'clamp(18px, 4vw, 20px)',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>
              ⬇️ Télécharger
            </h3>
            <p style={{
              margin: '5px 0 0 0',
              color: '#aaa',
              fontSize: 'clamp(12px, 3vw, 14px)',
              wordBreak: 'break-word',
              lineHeight: '1.4'
            }}>
              {videoTitle || `Vidéo importée (${videoId})`}
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 'clamp(20px, 5vw, 24px)',
              cursor: 'pointer',
              color: '#888',
              width: 'clamp(35px, 8vw, 40px)',
              height: 'clamp(35px, 8vw, 40px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'white';
              e.target.style.backgroundColor = '#333';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#888';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        </div>

        {/* Option sous-titres */}
        <div style={{
          marginBottom: '25px',
          padding: 'clamp(12px, 3vw, 15px)',
          backgroundColor: '#2a2a2a',
          borderRadius: '10px',
          border: '1px solid #333'
        }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(8px, 2vw, 12px)',
            cursor: 'pointer',
            fontSize: 'clamp(13px, 3vw, 14px)'
          }}>
            <div style={{
              width: 'clamp(18px, 4vw, 20px)',
              height: 'clamp(18px, 4vw, 20px)',
              border: '2px solid #555',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: downloadSubtitles ? '#ff4444' : 'transparent',
              transition: 'all 0.2s',
              flexShrink: 0
            }}>
              {downloadSubtitles && '✓'}
            </div>
            <input 
              type="checkbox" 
              checked={downloadSubtitles}
              onChange={(e) => setDownloadSubtitles(e.target.checked)}
              style={{ display: 'none' }}
            />
            <span style={{ color: 'white', lineHeight: '1.4' }}>
              📝 Télécharger les sous-titres (FR/EN)
            </span>
          </label>
        </div>

        {/* Formats de téléchargement - Grid responsive */}
        <div style={{ marginBottom: '30px', flex: 1, overflow: 'hidden' }}>
          <h4 style={{ 
            marginBottom: 'clamp(15px, 3vw, 20px)', 
            color: 'white',
            fontSize: 'clamp(15px, 3.5vw, 16px)',
            fontWeight: '600'
          }}>
            📦 Choisissez le format:
          </h4>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(8px, 2vw, 10px)',
            maxHeight: '300px',
            overflowY: 'auto',
            paddingRight: '5px'
          }}>
            {formatOptions.map(format => (
              <label 
                key={format.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'clamp(12px, 2.5vw, 15px)',
                  border: selectedFormat === format.id ? `2px solid ${format.color}` : '1px solid #444',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: selectedFormat === format.id ? '#2a2a2a' : '#252525',
                  transition: 'all 0.2s',
                  gap: 'clamp(10px, 2vw, 15px)',
                  minHeight: '80px'
                }}
                onMouseOver={(e) => {
                  if (selectedFormat !== format.id) {
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.borderColor = '#555';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedFormat !== format.id) {
                    e.currentTarget.style.backgroundColor = '#252525';
                    e.currentTarget.style.borderColor = '#444';
                  }
                }}
              >
                <input
                  type="radio"
                  name="format"
                  value={format.id}
                  checked={selectedFormat === format.id}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  style={{ 
                    margin: 0,
                    width: 'clamp(16px, 3vw, 18px)',
                    height: 'clamp(16px, 3vw, 18px)',
                    accentColor: format.color,
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: 'white',
                    fontSize: 'clamp(13px, 3vw, 14px)',
                    marginBottom: '4px',
                    wordBreak: 'break-word',
                    lineHeight: '1.3'
                  }}>
                    {format.label}
                  </div>
                  <div style={{ 
                    fontSize: 'clamp(11px, 2.5vw, 12px)', 
                    color: '#aaa',
                    marginBottom: '2px',
                    lineHeight: '1.3'
                  }}>
                    {format.desc}
                  </div>
                  <div style={{ 
                    fontSize: 'clamp(10px, 2vw, 11px)', 
                    color: format.color,
                    fontWeight: '500',
                    lineHeight: '1.3'
                  }}>
                    {format.size}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Bouton Télécharger */}
        <button 
          onClick={handleDownload}
          style={{
            width: '100%',
            padding: 'clamp(12px, 3vw, 15px)',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(255, 68, 68, 0.3)',
            minHeight: '50px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#ff3333';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 68, 68, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#ff4444';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 68, 68, 0.3)';
          }}
        >
          🚀 Lancer le téléchargement
        </button>

        {/* Conseils */}
        <div style={{ 
          padding: 'clamp(12px, 3vw, 15px)',
          backgroundColor: '#2a2a2a',
          borderRadius: '10px',
          fontSize: 'clamp(11px, 2.5vw, 12px)',
          color: '#888',
          border: '1px solid #333',
          lineHeight: '1.5'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(6px, 1.5vw, 8px)',
            marginBottom: '8px',
            color: '#4ecdc4'
          }}>
            <span>💡</span>
            <strong style={{ fontSize: 'clamp(12px, 2.5vw, 13px)' }}>
              Conseils de téléchargement
            </strong>
          </div>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px',
            lineHeight: '1.5'
          }}>
            <li>La <strong>meilleure qualité</strong> peut prendre plus de temps</li>
            <li>Le <strong>MP3</strong> est idéal pour la musique</li>
            <li>Les fichiers sont sauvegardés localement</li>
          </ul>
        </div>
      </div>

      {/* Media queries inline pour le responsive */}
      <style>
        {`
          @media (max-width: 480px) {
            .modal-content {
              margin: 10px;
              width: calc(100% - 20px);
            }
          }
          
          @media (max-width: 360px) {
            .format-grid {
              grid-template-columns: 1fr;
            }
          }
          
          /* Empêcher le zoom sur iOS */
          @media (max-width: 768px) {
            input, select, textarea {
              font-size: 16px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RealDownloadModal;