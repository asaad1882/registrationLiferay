# Nodejs FES Template

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 20.0.0


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Add .env in root of api project 
```
REACT_APP_SITE_KEY={REACT_GOOGLE_SITE_SECERT}
SITE_SECRET={GOOGLE_SITE_SECERT}
token={YOUR_API_KEY}
```
- Install dependencies
```
cd <project_name>
```
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8001`

- API Document endpoints

  swagger-ui  Endpoint : http://localhost:8080/api/v1/docs 


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |

| **src/v1/controllers**      | Controllers define functions to serve various express routes.  
| **src/v1/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/v1/routes**           | Contain all express routes, separated by module/area of application                       
| **src/v1/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src/v1/utils**           | Contains helper classes such as connection and swagger  |
| **src**/server.ts         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    
                                            


### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/index.js. Can be invoked with `npm start`                     | 
| `dev`                   | Runs full build before starting all watch tasks. Can be invoked with `npm dev`                                         |


