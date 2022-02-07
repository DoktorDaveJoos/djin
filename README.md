# A NestJs Boilerplate Project

This boilderplate includes:

- Nestjs Framework
- Prisma
- Authentication with JSON Webtoken
- Role-based authorization
- Seeding
- A docker-compose file with MySQL Database
- An env file that brings everything together

### Prerequisites

You will need:
1. Node & NPM installed
2. (Optional) Docker installed

### Quickstart

1. Checkout this repo
2. Start up the MySQL Database
`docker-compose up -d` or if you don't have docker installed a local running Database
3. `npm i` to install all the deps
4. `npx prisma migrate dev` to run all migrations
5. `npm run seed` to seed the databse with an admin and an user-user
6. `npm run start:debug` to get going

Cheers!
