# Niyo-assessment

## Task management System

## Description
This project is an application that helps users create and monitor their daily tasks. Users must sign up and log in before they can create tasks. Each endpoint is protected to ensure that only authenticated users can access and manage their own tasks. A user cannot modify a task that they did not create. This project is built using the NestJS framework with Node.js, TypeORM, and PostgreSQL for the database. Passwords are encrypted, and JWT is used to generate access tokens for authentication.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
Once this project is pulled, run this command
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```

### Create User Endpoint

POST: http://127.0.0.1:3000/users/create

{
    "name": "",
    "email": "",
    "password": ""
}

### Login User Endpoint

POST: http://127.0.0.1:3000/users/login

{
    "email": "isintume@gmail.com",
    "password": "1234ghk"
}

### Before any of these endpoints will be access, access token should be pass on the Authorization : 

### Create Task Endpoint

POST: http://127.0.0.1:3000/tasks

{
    "title": "Studing",
    "description": "the word"
}

### All Created Tasks

GET: http://127.0.0.1:3000/tasks

### Get Task by Id
GET: http://127.0.0.1:3000/tasks/:id

### Update Task By Id
PATCH: http://127.0.0.1:3000/tasks/:id/status

{
    "status": "in_progress" | 'done'
}

### Delete A Task By Id

DELETE: http://127.0.0.1:3000/tasks/:id
