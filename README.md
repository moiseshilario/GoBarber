# GoBarber

## Sequelize setup

### Init sequelize
`npx sequelize init`

### Create a migration
`npx sequelize migration:create --name=create-users`

### Migrate (after setting up the migration)
`npx sequelize migrate`

---

## Docker setup

### Postgres image
`docker run --name gobarberdb -p 5432:5432 -d -t kartoza/postgis`

### Start
`docker start gobarberdb`

### Stop
`docker stop gobarberdb`

---
