# FHIR-API-Server

## Overview
This project is a FHIR-API (Fast Healthcare Interoperability Resources) server implemented using Node.js. The server provides CRUD (Create, Read, Update, Delete) functionalities for managing patient information, along with user registration ,login and authentication . Server has JWT token based authentication which secured the Patient data from unauthorized Users.

## Features

- Node.js Project
- SQL scripts for setting up the Patient data backend
- FHIR API server capable of CRUD operations on patient info
- Authentication with JWT Token
- Postman tests for API verification


## Installation

### Prerequisites

- Node.js
- npm 
- PostgreSQL (or MySQL)

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/xGaurav01/FHIR-API-Server.git
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```
3. Create the DATABASE and TABLES using the `src/database.sql` script in PostgreSQL:

4. Configure the database connection in `src/config/db-config.js` :
    ```javascript
    const database = new Pool({
    user: "username",
    host: "localhost",
    database: "db_name",
    password: "password",
    port: 5432,
    });
    ```

5. Run the server using command:
    ```sh
    npm run start
    ```


