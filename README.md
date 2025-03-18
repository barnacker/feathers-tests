# Vue + Feathers.js Boilerplate

A template for starting projects using [Vue](https://vuejs.org/guide/introduction.html) ([Quasar](https://v2.quasar.dev)) and [Feathers.js](https://feathersjs.com/guides/).

## Backend

This project uses [Feathers.js](https://feathersjs.com/guides/) as a Backend and [MongoDB](https://www.mongodb.com/docs/) as the database.

Located in `./backend`. View [`README.md`](./backend/README.md) for more info.

## Frontend

This project uses [Vue](https://vuejs.org/guide/introduction.html) with [Quasar](https://v2.quasar.dev) and [Feathers Pinia](https://feathers-pinia.pages.dev/guide/) as the Frontend

Located in `./frontend`. View [`README.md`](./frontend/README.md) for more info.

## Database (also in the backend README)

You can simply start a MongoDB instance using Docker by running:

```bash
   docker run -p 27017:27017 --rm -d --name project-template-mongodb -v "$(git rev-parse --show-toplevel)/data:/data/db" mongo:latest
```
