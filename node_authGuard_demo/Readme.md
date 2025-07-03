// steps
1- run the server using sqlstart
2- create the database: >> CREATE DATABASE dbname(db should be small Letters);
3- connect to the database using: >> \c dbname(in small letters)
4- connect it inside .env file using this url:
DATABASE_URL=postgresql://username:pass@localhost:5432/dbname (change the values)
5- added the pool connect to connect to postgres port
6- Create a table to store values
7 - enjoy
