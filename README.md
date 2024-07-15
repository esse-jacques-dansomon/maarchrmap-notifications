Voici un exemple de README structuré pour une application NestJS qui lit des données dans une table et envoie des notifications grâce à un job Cron :

# SCRIPT DE LECTURE ET ENVOI DE NOTIFICATIONS

## Table des matières

- [Introduction](#introduction)
- [Technologie utilisée](#technologie-utilisée)
- [Les composants](#les-composants)
- [L'architecture](#larchitecture)
- [Le flow](#le-flow)
- [L’exploitation des logs](#lexploitation-des-logs)

## Introduction

Ce script permet de lire des données depuis une table de base de données et d'envoyer des notifications programmées grâce à un job Cron. L'application est construite avec le framework NestJS.

## Technologie utilisée

Le script se base sur NestJS et utilise les packages suivants :

## Les composants

- `"@nestjs/common": "^10.1.2"` : composants NestJS de base
- `"@nestjs/core": "^10.1.2"` : noyau de NestJS
- `"@nestjs/schedule": "^2.0.0"` : pour la gestion des jobs Cron
- `"@nestjs/typeorm": "^10.1.2"` : pour l'intégration TypeORM
- `"typeorm": "^0.3.7"` : ORM pour interagir avec la base de données
- `"pg": "^8.7.3"` : driver PostgreSQL pour Node.js
- `"dotenv": "^16.4.5"` : pour les variables d'environnement

## L'architecture

L'application est construite selon l'architecture modulaire de NestJS. Les modules principaux incluent :

- **NotificationModule** : pour la logique de lecture de données et d'envoi de notifications
- **DatabaseModule** : pour la configuration de la base de données
- **CronModule** : pour la configuration et l'exécution des jobs Cron

## Le flow

1. Cloner le projet avec la commande :
   ```sh
   git clone git@gitlab.com:axone2/maarchrm/maarchrmap-notifications.git
   ```

2. Installer les packages :
   ```shell
   cd maarchrmap-notifications
   npm install
   ```

3. Configuration

    - Créer un fichier `.env` à partir du modèle fourni :
      ```sh
      cp .env.example .env
      ```
    - Mettre à jour les variables d'environnement dans le fichier `.env` avec les informations nécessaires (base de données, configurations de notification, etc.).

4. Lancer l'application :
   ```shell
   npm run start
   ```

## L’exploitation des logs

Une fois l'application lancée, des logs seront affichés dans le terminal pour suivre l'exécution des jobs Cron et les opérations de lecture et d'envoi de notifications. Les logs peuvent également être configurés pour être enregistrés dans des fichiers pour une analyse ultérieure.

---

### Exemple de contenu du fichier `.env`

```env
# Configuration de la base de données
#API
PORT=3000
GLOBAL_PREFIX=api

#DATABASE
DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=

#JWT
JWT_KEY=dev
JWT_EXPIRES=365d

#MAIL
MAIL_HOST=
MAIL_PORT=
MAILER_SECURE=
MAILER_TLS=tls
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
```

---

Avec cette structure, vous pouvez gérer l'installation, la configuration, et le déploiement de votre application NestJS, tout en suivant les bonnes pratiques pour la gestion des variables d'environnement et des logs.