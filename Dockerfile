FROM node:current-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json dans le conteneur
COPY package.json /app

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . /app

# Exposer le port utilisé par l'application
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "start"]
