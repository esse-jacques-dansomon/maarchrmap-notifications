# Project Installation Guide

This guide provides step-by-step instructions to clone the repository, update the database, create a new `.env` file, install dependencies, build, and run the project.

## Table of Contents

1. [Clone the Repository](#clone-the-repository)
2. [Update the Database](#update-the-database)
3. [Create a New .env File](#create-a-new-env-file)
4. [Install the Dependencies](#install-the-dependencies)
5. [Build the Project](#build-the-project)
6. [Run the Project](#run-the-project)

## Clone the Repository

First, you need to clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/esse-jacques-dansomon/maarchrmap-notifications.git  
cd maarchrmap-notifications
```

## Update the Database

Update maarchrmap database
```sql
CREATE TYPE axoneNotificationType AS ENUM('notVerified', 'canBeNotified', 'canNotBeNotified');

ALTER TABLE "lifeCycle"."event"
    ADD COLUMN "axoneNotification" axoneNotificationType DEFAULT 'notVerified';

ADD COLUMN "axoneNotificationSent" boolean DEFAULT false;
```

## Create a New .env File

Create a `.env` file in the root of your project directory with the following content, replacing placeholders with your actual database configuration:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=maarch
DATABASE_PASSWORD=maarch
DATABASE_NAME=maarchRMAP

MAIL_HOST=
MAIL_PORT=
MAILER_SECURE=
MAILER_TLS=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
```

## Install the Dependencies

Ensure you have Node.js and npm installed. If not, install them from [Node.js official website](https://nodejs.org/).

Install the project dependencies by running:

```bash
npm install
```

## Build the Project

To build the project, run:

```bash
npm run build
```

## Run the Project

Finally, to run the project, use:

```bash
npm run start:prod
```

Alternatively, if you are using Docker, you can build and run the project using Docker Compose:

1. Ensure Docker and Docker Compose are installed on your machine.

2. Build and start the containers:

    ```bash
    docker-compose up --build
    ```

3. Your application should now be running and accessible at `http://localhost:3000`.

## Additional Notes

- Make sure to replace `yourusername` and `yourrepository` with the actual username and repository name.
- Ensure your PostgreSQL server is configured correctly to accept connections from your application.
- Check the Docker configuration if you are using Docker to ensure all services are set up correctly.
- For any issues or further customization, refer to the project's documentation or contact the maintainers.
