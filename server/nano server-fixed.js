const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const YtDlpWrap = require('yt-dlp-wrap').default;
const fetch = require('node-fetch'); // <-- Corrigé : importé une seule fois en haut
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialisation de yt-dlp
const ytDlpWrap = new YtDlpWrap();

app.use(cors());
app.use(express.json());

const downloadsDir = path.join(__dirname, 'downloads');
fs.ensureDirSync(downloadsDir);

// --- API Endpoints ---

// Endpoint pour démarrer un téléchargement
app.post('/api/download', (req, res) => {
  const { url, format } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  console.log(`[INFO] Demande de téléchargement reçue pour : ${url}`);
  
  ytDlpWrap.exec([
    url,
    '-f', format || 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    '-o', path.join(downloadsDir, '%(title)s.%(ext)s'),
    '--merge-output-format', 'mp4',
    '--sponsorblock-mark', 'all'
  ]).on('progress', (progress) => {
      console.log(`[PROGRESS] ${progress.percent}% - ${url}`);
  }).on('error', (error) => {
      console.error(`[ERROR] Échec du téléchargement pour ${url}:`, error.message);
  }).on('close', () => {
      console.log(`[SUCCESS] Téléchargement terminé pour : ${url}`);
  });

  res.status(202).json({ message: 'Le téléchargement a commencé en arrière-plan.' });
});

// Endpoint pour lister les fichiers téléchargés
app.get('/api/downloads', async (req, res) => {
  try {
    const files = await fs.readdir(downloadsDir);
    const videoDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(downloadsDir, file);
        const stats = await fs.stat(filePath);
        return {
          filename: file,
          size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
          date: stats.birthtime.toLocaleDateString(),
          path: filePath,
          type: ['.mp3', '.m4a', '.wav'].includes(path.extname(file)) ? 'audio' : 'video'
        };
      })
    );
    res.json(videoDetails.reverse());
  } catch (error) {
    console.error("Erreur lors de la lecture du dossier de téléchargements:", error);
    res.status(500).json({ error: 'Impossible de lister les fichiers' });
  }
});

// Endpoint pour supprimer un fichier
app.delete('/api/downloads/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(downloadsDir, filename);

        if (await fs.pathExists(filePath)) {
            await fs.remove(filePath);
            console.log(`[DELETED] Fichier supprimé: ${filename}`);
            res.json({ message: 'Fichier supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Fichier non trouvé' });
        }
    } catch (error) {
        console.error(`Erreur lors de la suppression de ${req.params.filename}:`, error);
        res.status(500).json({ error: 'Impossible de supprimer le fichier' });
    }
});


// Endpoint pour servir/lire une vidéo
app.get('/api/video/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(downloadsDir, filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Fichier non trouvé');
    }
});

// Endpoint pour la recherche YouTube (utilise la clé API)
app.get('/api/youtube/search', async (req, res) => {
    const { q, maxResults = 8 } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "Clé d'API YouTube non configurée sur le serveur." });
    }
    if (!q) {
        return res.status(400).json({ error: 'Paramètre de recherche "q" manquant.' });
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&maxResults=${maxResults}&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        res.json(data);
    } catch (error) {
        console.error("Erreur de l'API YouTube:", error.message);
        res.status(500).json({ error: `Erreur lors de la recherche sur YouTube: ${error.message}` });
    }
});


// Endpoint de santé
app.get('/api/health', (req, res) => {
  res.json({ message: 'Le serveur fonctionne parfaitement !' });
});

app.listen(port, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${port}`);
});