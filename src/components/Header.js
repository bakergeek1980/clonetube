import React from 'react';
import logo from '../assets/images/logo_tubeclone.png';

const Header = ({ onThemeToggle, isDarkMode, onShowDownloads }) => {
  const handleLogoError = (e) => {
    // Fallback si le logo ne charge pas
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    parent.innerHTML = `
      <div style="
        width: 100%; 
        height: 100%; 
        background: linear-gradient(135deg, #ff4444, #ff6b6b); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: white; 
        font-weight: bold; 
        font-size: 16px;
        border-radius: 10px;
      ">
        TC
      </div>
    `;
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Partie gauche - Logo TubeClone */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px'
      }}>
        {/* Conteneur logo */}
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(255, 68, 68, 0.3)',
          border: `2px solid ${isDarkMode ? '#333' : 'white'}`,
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 20px rgba(255, 68, 68, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(255, 68, 68, 0.3)';
        }}>
          <img 
            src={logo} 
            alt="TubeClone Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '2px'
            }}
            onError={handleLogoError}
          />
        </div>
        
        {/* Texte TubeClone */}
        <div>
          <h1 style={{ 
            margin: 0, 
            color: isDarkMode ? 'white' : '#333',
            fontSize: '28px',
            fontWeight: '800',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #ff4444, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            TubeClone
          </h1>
          <p style={{
            margin: '2px 0 0 0',
            color: isDarkMode ? '#aaa' : '#666',
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.5px'
          }}>
            YouTube Downloader Premium
          </p>
        </div>
      </div>
      
      {/* Partie droite - Boutons */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px' 
      }}>
        {/* Bouton Mes Téléchargements */}
        <button
          onClick={onShowDownloads}
          style={{
            background: isDarkMode ? 
              'linear-gradient(135deg, #2a2a2a, #333)' : 
              'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            color: isDarkMode ? 'white' : '#333',
            border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
            padding: '12px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minWidth: '180px',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            e.target.style.background = isDarkMode ? 
              'linear-gradient(135deg, #333, #404040)' : 
              'linear-gradient(135deg, #e9ecef, #dee2e6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            e.target.style.background = isDarkMode ? 
              'linear-gradient(135deg, #2a2a2a, #333)' : 
              'linear-gradient(135deg, #f8f9fa, #e9ecef)';
          }}
        >
          <span style={{ 
            fontSize: '18px',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
          }}>
            📁
          </span>
          <span>Mes Téléchargements</span>
          <span style={{
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '10px',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: 'bold',
            marginLeft: '5px'
          }}>
            PRO
          </span>
        </button>

        {/* Séparateur */}
        <div style={{
          width: '1px',
          height: '35px',
          background: isDarkMode ? 
            'linear-gradient(to bottom, transparent, #444, transparent)' : 
            'linear-gradient(to bottom, transparent, #ddd, transparent)',
          margin: '0 8px'
        }}></div>

        {/* Bouton Thème */}
        <button
          onClick={onThemeToggle}
          style={{
            background: isDarkMode ? 
              'linear-gradient(135deg, #2a2a2a, #333)' : 
              'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            border: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
            color: isDarkMode ? 'white' : '#333',
            padding: '12px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px) rotate(5deg)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            e.target.style.background = isDarkMode ? 
              'linear-gradient(135deg, #333, #404040)' : 
              'linear-gradient(135deg, #e9ecef, #dee2e6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0) rotate(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            e.target.style.background = isDarkMode ? 
              'linear-gradient(135deg, #2a2a2a, #333)' : 
              'linear-gradient(135deg, #f8f9fa, #e9ecef)';
          }}
          title={isDarkMode ? 'Passer en mode clair ☀️' : 'Passer en mode sombre 🌙'}
        >
          <span style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
            transition: 'transform 0.3s ease'
          }}>
            {isDarkMode ? '☀️' : '🌙'}
          </span>
        </button>

        {/* Indicateur de statut */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          background: isDarkMode ? 
            'linear-gradient(135deg, #2a2a2a, #333)' : 
            'linear-gradient(135deg, #f8f9fa, #e9ecef)',
          borderRadius: '10px',
          border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
          fontSize: '12px',
          color: '#4ecdc4',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#4ecdc4',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
            boxShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
          }}></div>
          <span style={{
            background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            En ligne
          </span>
        </div>
      </div>

      {/* Style pour l'animation de pulsation */}
      <style>
        {`
          @keyframes pulse {
            0% { 
              transform: scale(1);
              opacity: 1;
              box-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
            }
            50% { 
              transform: scale(1.1);
              opacity: 0.7;
              box-shadow: 0 0 15px rgba(78, 205, 196, 0.8);
            }
            100% { 
              transform: scale(1);
              opacity: 1;
              boxShadow: 0 0 10px rgba(78, 205, 196, 0.5);
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;