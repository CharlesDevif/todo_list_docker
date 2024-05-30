# Projet Node.js avec TypeScript, Docker et MySQL

## Table des matières

- [Description](#description)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Variables d'environnement](#variables-denvironnement)
- [Utilisation de Docker](#utilisation-de-docker)
- [Déploiement](#déploiement)
- [Contributions](#contributions)
- [Licence](#licence)

## Description

Ce projet est une application web utilisant Node.js, TypeScript, Express, et MySQL. Il utilise Docker pour la gestion des conteneurs et Docker Compose pour orchestrer les services. L'application inclut également un frontend React.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clonez le dépôt :

    ```sh
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2. Installez les dépendances pour le backend et le frontend :

    ```sh
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

## Démarrage

### Utilisation de Docker

1. Assurez-vous que Docker et Docker Compose sont installés et en cours d'exécution.
2. Démarrez les services avec Docker Compose :

    ```sh
    docker-compose up --build -d
    ```

3. Accédez à l'application via votre navigateur :

    - Backend : `http://localhost:5000`
    - Frontend : `http://localhost:8090`
    - phpMyAdmin : `http://localhost:8080`

### Démarrage sans Docker

#### Backend

1. Configurez les variables d'environnement. Copiez le fichier `.env.example` en `.env` et modifiez-le selon vos besoins :

    ```sh
    cp backend/.env.example backend/.env
    ```

2. Démarrez le serveur backend :

    ```sh
    cd backend
    npm run build
    npm start
    ```

#### Frontend

1. Démarrez l'application frontend :

    ```sh
    cd frontend
    npm start
    ```

## Structure du projet

    ├── backend
    │   ├── src
    │   │   ├── controllers
    │   │   ├── models
    │   │   ├── routes
    │   │   ├── app.ts
    │   │   ├── server.ts
    │   ├── .env.example
    │   ├── Dockerfile
    │   ├── package.json
    │   └── tsconfig.json
    ├── frontend
    │   ├── src
    │   ├── public
    │   ├── package.json
    │   ├── Dockerfile
    │   └── tsconfig.json
    ├── docker-compose.yml
    └── README.md

## Scripts disponibles

### Backend

- `npm run build` : Compile le code TypeScript.
- `npm start` : Démarre l'application.
- `npm run dev` : Démarre l'application en mode développement avec rechargement automatique.

### Frontend

- `npm start` : Démarre l'application en mode développement.
- `npm run build` : Compile l'application pour la production.

## Variables d'environnement

Les variables d'environnement sont définies dans le fichier `.env`. Voici un exemple de ce à quoi il devrait ressembler :

DB_HOST=mariadb;
DB_USER=user;
DB_PASSWORD=password;
DB_DATABASE=mydatabase;


## Utilisation de Docker

Pour arrêter les services Docker :

```sh
docker-compose down
docker-compose up -d