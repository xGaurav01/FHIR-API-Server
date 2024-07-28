# FHIR-API-Server

## Overview
This project is a FHIR-API server implemented in Node.js. It includes functionalities for reading, updating, and deleting patient information. The server uses basic authentication and is tested using Postman.

## Features

- Node.js Project
- SQL scripts for setting up the Patient data backend
- FHIR API server capable of CRUD operations on patient info
- Authentication
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

4. Configure the database connection in `src/config/db-config.js`:
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


