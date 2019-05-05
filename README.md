# GoBarber

A barber scheduling nodejs app using postgres and nunjucks.

### Setup Requirements

- Install Docker

- Install the postgres image: `kartoza/postgis`

```
docker run --name [name of your container] -p 5432:5432 -d -t kartoza/postgis
```

- Run the docker container
```bash
docker start [name of your container]
```

- Run the project:
```bash
yarn start
``` 
or 
```bash
npm run start
```

---

# Project development steps

## Sequelize setup

### Init sequelize
`npx sequelize init`

### Create User migration
`npx sequelize migration:create --name=create-users`

### Create Appointment migration
`npx sequelize migration:create --name=create-appointments`

### Migrate (after setting up the migration)
`npx sequelize migrate`


## Docker setup

### Postgres image
`docker run --name gobarberdb -p 5432:5432 -d -t kartoza/postgis`

### Start
`docker start gobarberdb`

### Stop
`docker stop gobarberdb`
