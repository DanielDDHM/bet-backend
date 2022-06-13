# Bet Backend

## 👨🏻‍💻 About this project
Backend For Bet App from CajaCodes

## 🪓 Requirements

- Docker
- MongoDb
- Node 15

## 🚀 Technologies
 - Typescript
 - Prisma
 - Docker
 - MongoDB
 - Redis
 - ExpressJS


## 🐳  Getting Started With Docker (recomended)

1. Clone the Repo;
2. Install development dependencies: `$ npm install`
3. Run Docker Development mode: `$ docker-compose up -d`
4. Enjoi!

## 💻  Getting Started without Docker (not recomended)

1. Clone the Repo;
2. Install development dependencies: `$ npm install`
3. Start development server: `$ npm run dev`
4. Enjoi!


## ⚒️ Included npm scripts

Run this commands from the project folder with `npm run "script-name"`.
* `start`: runs project with lint fixed
* `dev`: runs project in development mode
* `build`: builds all .ts files from `./src` folder to `./build`
* `lint`: lints source code using `eslint`
* `update`: easily check for updates and update all dependencies
* `test`: run tests

## External typings augmentation
This starter is already configured to allow you to extend typings of external packages. The logic behind it is based on [this](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html) official template. To augment a module, just create a folder with the same name as the module you are augmenting and add an index.d.ts in it. [Here](https://github.com/fox1t/fastify-websocket-router/tree/master/typings/fastify) you can find a real world example.

## 🪰 Debugging
> Warning: This starter uses new V8 [inspect protocol](https://nodejs.org/api/debugger.html) so you have to use at least Node.js 7.7.4 if you want to use the included debugger settings.

#### Steps:
* start dev server with `npm run start` or `yarn start`
* now you have two ways:
  * use the provided debug URL in Chrome
  * use VS Code included (inside .vscode folder) `attach` config (best debugging experience)

## Docker Support

This stater uses Node.js best practices and creates dummy user to start node process, instead of using root user.

```
# Go to the root of your repo created from this starter
# Build your docker image
docker build -t payments-service .

# run your docker container
docker run -p 3000:3000 payments-service
```
