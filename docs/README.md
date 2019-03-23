# SmartBrain

The Express.js backend to support the front-end app of the same name using Knex.js to connect to the PostgreSQL database

## Links

-   [Code](https://github.com/nair-ayush/SmartBrain)
-   [Documentation](https://nair-ayush.github.io/SmartBrain/)
-   [Website](https://smartbraincla.herokuapp.com/)

## Roadmap

-   [ ] /
-   [x] /signin
-   [x] /register
-   [x] /image
-   [x] /profile:<id>
-   [x] /imageurl
-   [x] Deploy

## Endpoints

### /

NEEDS WORK

### /signin

-   Success 200 OK
    -   ````json
          {
              "id": "$ID",
              "name": "SNAME",
              "email": "$EMAIL",
              "entries": "$#_OF_ENTRIES",
              "joining": "$JOINING_DATE"
          }```
        ````
-   Failure 400 Bad Request Error
    -   `"Incorrect form submission"` -> One or more empty form inputs
    -   `"Wrong credentials` -> Username password pair do not match
-   Failure 500 Internal Server Error
    -   `"Unable to get user"` -> Unable to connect to database.

### /register

NEEDS WORK

### /image

NEEDS WORK

### /profile:<id>

NEEDS WORK

### /imageurl

NEEDS WORK

## Dependencies

1. [Express ^4.16.4](https://www.npmjs.com/package/express)
2. [Body Parser ^1.18.3](https://www.npmjs.com/package/body-parser)
3. [Clarifai ^2.9.0](https://www.npmjs.com/package/clarifai)
    - Visit their website [here](https://clarifai.com/).
4. [Bcrypt-Nodejs ^0.0.3](https://www.npmjs.com/package/bcrypt-nodejs)
5. [Knex ^0.16.3](https://www.npmjs.com/package/knex)
6. [Pg ^7.8.2](https://www.npmjs.com/package/express)
7. [CORS ^2.8.5](https://www.npmjs.com/package/cors)

## DevDependencies

1. [Nodemon ^1.18.10](https://www.npmjs.com/package/nodemon)

## Contributing

Please fork this repository and checkout to a new branch to start working.
