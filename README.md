# popit



Hello! And welcome to PopIt app :)

The app consists of two main folders : backend (REST API w NestJS) and frontend (classic CRA)

## Steps to reproduce local environment

1. Docker must be installed on your machine
2. Clone the repo
3. create an `.env` file in root directory like this:
- `NODE_ENV=development`
- `FRONTEND_PORT=PORT_NUMBER`
- `BACKEND_PORT=PORT_NUMBER`
- `JWT_SECRET=jwt_secret_key_here`
- `JWT_EXPIRES_IN=30d`
- `DB_CONNECTION=postgres`
- `DB_HOST=bp-pg-db`
- `DB_NAME=bp-pg-db`
- `DB_USER=postgres`
- `DB_PASSWORD=root`
- `DB_PORT=5432`
- `DB_MIGRATIONS_RUN=true`
- `PGADMIN_DEFAULT_EMAIL=admin@backend.com`
- `PGADMIN_DEFAULT_PASSWORD=pass123`
- `PGADMIN_PORT=5055`
- `REACT_APP_API_URL=http://localhost:3001`

4. execute `docker-compose up` from root folder 
5. have fun testing the app with `jest`! (already installed)

## Datasets
Datasets are available in backend/src/data folder with a seeder module (using nestjs command).

Have fun !
