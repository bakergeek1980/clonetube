#!/usr/bin/env bash

# Arrête le script en cas d'erreur
set -o errexit

echo "---> Mise à jour des paquets système"
apt-get update

echo "---> Installation de python, pip, et ffmpeg"
apt-get install -y python3 python3-pip ffmpeg

echo "---> Installation de yt-dlp via pip"
pip3 install --upgrade yt-dlp

echo "---> Déplacement dans le dossier du serveur"
cd server

echo "---> Installation des dépendances Node.js"
npm install
