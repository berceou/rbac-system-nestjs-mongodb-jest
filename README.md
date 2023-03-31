# RBAC System With NestJS & MongoDB

Develop a Role-Based Access Control System with Jest Testing using Typescript, NestJS, MongoDB. The task includes building a role-based access control system with three roles - Store Manager, Global Admin, and Normal User. The system will have two entities - Store and Product.
The Global Admin role will be able to create stores and create other users (Store Managers and Normal Users). The Store Manager role will be able to create products for their respective stores. The Normal User role will be able to view all products in all stores.
The system should include authentication to ensure that only authorized users are able to access the relevant features.

## Requirements

- Implement a role-based access control system with three roles - Store Manager, Global Admin, and Normal User.
- Implement two entities - Store and Product.
- The Global Admin should be able to create stores and create other users.
- The Store Manager should be able to create products for their respective stores.
- The Normal User should be able to view all products in all stores.
- Implement authentication to ensure that only authorized users are able to access the relevant features.
- The system should be built using Typescript, NestJS, MongoDB, and Jest for testing.
- Write unit and integration tests using Jest to ensure the functionality and security of the system.
- Swagger documentation is optional but recommended.

## Tech Stack

Typescript  
 NestJS  
 MongoDB  
 Jest  
 Swagger (Optional)

## Running Tests

To run tests, run the following command

```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```

## Environment Variables

To run this project, you will need to add the environment variable `DB_URI` which is the link to connect mongoDB to your .env file

## Documentation

After runnin the project (`npm run start:dev`) , you can access swagger with http://localhost:3000/api in the browser

## Run Locally

Clone the project

```bash
  git clone https://github.com/berceou/rbac-system-case.git
```

Go to the project directory

```bash
  cd rbac-system-case
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```


