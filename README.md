# Stream-API

The database schema and API routes information can be found in the [requirements](REQUIREMENTS.md)

## Libraries used

- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Database: Postgresql
- Testing: Jasmine and Superjest

## Available Scripts

**Install the app's dependencies**

```
npm install
```

**Build a copy of app to 'dist' folder**

```
npm run build
```

**create the database**
for development mode

```
npm run create-dev-db
```

for test mode

```
npm run create-test-db
```

**setup the database tables**

```
npm run migrate
```

**Run the app in development mode**

```
npm start
```

A sample request to try out.<br />
`http://localhost:3000/movies`

**Run test cases**

```
npm run test
```

## Ports

The application runs on port `3000`<br />
The database runs on port `5432`

## Setup for .env file

```docker
NODE_ENV=development
PORT=3000
#postgres
PG_HOST=localhost
PG_DB=project
PG_DB_TEST=project_test
PG_USER=postgres
PG_PASSWORD=password
#bcrypt
SALT=10
PAPER=additionalPassword
#JWT
JWT_SECRET=secret
```
