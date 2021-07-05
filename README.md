# user-management-system
 
# Running

To run this project, you'll need `docker-compose` installed.

Run
```
docker-compose up
```
and wait until all the builds finished.
Then the UI will we available at http://localhost:5001

# Architecture

As it was said in the task, the solution uses Docker.
The project contains 3 (TODO 4) images:
1. `users-api` provides RESTful API to manage the users.
1. `users-statics` servers the HTML client.
1. `users-database` runs PostgreSQL server to persist the data.
1. (TODO) `users-e2e` runs e2e test on the application.

# Server API

| Method | Endpoint | Arguments | Returned value | Http responses |
|---|---|---|---|---|
| `GET` | `/users` | `limit`, `offset` | A list of User objects, max length is `limit`, first `offset` entities are skipped. Default values: `limit=15`, `offset=0` | `200` |
| `POST` | `/users` | `firstName`, `lastName`, `email`, `password`, `description` | Saves a new user with given parameters in the database and returns a URL to the created user. `email` and `password` are mandatory | `201` with `Location` header, `401` if request lacks mandatory fields |
| `GET` | `/users/{id}` | | The user identified by given `id` | `200` if a user with given `id` exists, `404` if it doesn't |
| `PUT` | `/users/{id}` | `firstName`, `lastName`, `email`, `password`, `description` | Updates data for the user with given `id` and returns the updated user. `email` and `password` are mandatory | `200` if the user exists, `404` if it doesn't, `401` if mandatory fields don't exist in the request
| `DELETE` | `/users/{id}` | | Removes the user with given `id` from the database | `204` if the user existed, `404` if it didn't

Passwords are not be saved as is in the database. Instead their secure hashes are saved.