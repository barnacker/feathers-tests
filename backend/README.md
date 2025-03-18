# Project Template - Backend

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd ./backend
    yarn --frozen-lockfile
    ```

## Database (also in the project level README)
3. Start MongoDb

   ```bash
   docker run -p 27017:27017 --rm -d --name project-template-mongodb -v "$(git rev-parse --show-toplevel)/data:/data/db" mongo:latest
   ```

4. Start your app (for development)

    ```
    yarn bundle:client  # build package for frontend
    yarn dev
    ```

## Testing

Run `yarn test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
