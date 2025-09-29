class YtDlpService {
  constructor() {
   this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  async downloadVideo(options, onProgress, onComplete, onError) {
    const { url, format, downloadSubtitles } = options;
    
    try {
      console.log('📤 Début du téléchargement:', url);
      
      const response = await fetch(`${this.baseURL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          format: format || 'best',
          downloadSubtitles: downloadSubtitles || false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur démarrage téléchargement');
      }

      const result = await response.json();
      console.log('✅ Réponse serveur:', result);
      
      // Le serveur répond immédiatement, on notifie le succès
      if (onComplete) {
        onComplete({ 
          filename: 'Téléchargement démarré', 
          message: 'Le téléchargement a commencé en arrière-plan',
          status: 'started',
          url: url
        });
      }

      // On peut aussi simuler une progression (optionnel)
      if (onProgress) {
        setTimeout(() => onProgress({ percent: 25, message: 'Téléchargement en cours...' }), 1000);
        setTimeout(() => onProgress({ percent: 75, message: 'Presque terminé...' }), 3000);
        setTimeout(() => onProgress({ percent: 100, message: 'Terminé!' }), 5000);
      }

    } catch (error) {
      console.error('❌ Erreur téléchargement:', error);
      if (onError) {
        onError(error.message);
      }
    }
  }

  // Recherche de vidéos YouTube
  async searchVideos(query, maxResults = 8) {
    try {
      console.log('🔍 Recherche:', query);
      
      const response = await fetch(
        `${this.baseURL}/youtube/search?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
      );
      
      if (!response.ok) {
        throw new Error(`Erreur recherche: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ ${data.items?.length || 0} résultats trouvés`);
      return data;
      
    } catch (error) {
      console.error('❌ Erreur recherche:', error);
      throw error;
    }
  }

  // Liste des téléchargements existants
  async getDownloads() {
    try {
      console.log('📁 Chargement liste téléchargements...');
      
      const response = await fetch(`${this.baseURL}/downloads`);
      
      if (!response.ok) {
        throw new Error(`Erreur liste: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ ${data.length} fichiers trouvés`);
      return data;
      
    } catch (error) {
      console.error('❌ Erreur liste téléchargements:', error);
      throw error;
    }
  }

  // Lecture d'une vidéo
  getVideoUrl(filename) {
    return `${this.baseURL}/video/${filename}`;
  }

  // Supprimer un fichier
  async deleteDownload(filename) {
    try {
      console.log('🗑️ Suppression:', filename);
      
      const response = await fetch(`${this.baseURL}/downloads/${filename}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Erreur suppression: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Fichier supprimé:', filename);
      return result;
      
    } catch (error) {
      console.error('❌ Erreur suppression:', error);
      throw error;
    }
  }

  // Statistiques
  async getStats() {
    try {
      const response = await fetch(`${this.baseURL}/stats`);
      
      if (!response.ok) {
        throw new Error(`Erreur stats: ${response.status}`);
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('❌ Erreur stats:', error);
      throw error;
    }
  }

  // Vérifier la santé du serveur
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      
      if (!response.ok) {
        throw new Error(`Serveur indisponible: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Serveur OK:', data.message);
      return data;
      
    } catch (error) {
      console.error('❌ Serveur hors ligne:', error);
      throw error;
    }
  }
}

export default new YtDlpService();