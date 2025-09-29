#!/usr/bin/env bash

# On indique au script de s'arrêter en cas d'erreur
set -o errexit

echo "---> Installation des dépendances système (python, pip, ffmpeg)"
apt-get update
apt-get install -y python3 python3-pip ffmpeg

echo "---> Installation de yt-dlp"
pip3 install yt-dlp

echo "---> Installation des dépendances Node.js"
# On se déplace dans le dossier du serveur pour lancer npm install
cd server
npm install