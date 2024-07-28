-- Create the database
CREATE DATABASE fhir_db;

-- Connect to fhir_db
\c fhir_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(50),
    active BOOLEAN,
    name VARCHAR(100),
    telecom VARCHAR(50),
    gender VARCHAR(10),
    birthDate DATE,
    address VARCHAR(255),
    maritalStatus VARCHAR(50),
    multipleBirthBoolean BOOLEAN,
    multipleBirthInteger INTEGER,
    photo VARCHAR(255),
    contact VARCHAR(255),
    communication VARCHAR(255),
    generalPractitioner VARCHAR(255),
    managingOrganization VARCHAR(255),
    link VARCHAR(255)
);

INSERT INTO users (id, username, password) VALUES (1, 'test12345', 'testuser123');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) VALUES (1, '12345', true, 'John Doe', '555-555-5555', 'male', '1980-01-01', '123 Main St');


