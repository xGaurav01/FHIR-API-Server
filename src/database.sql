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

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (1, '12345', true, 'John Doe', '555-555-5555', 'male', '1980-01-01', '123 Main St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (2, '67890', true, 'Jane Smith', '555-555-5556', 'female', '1985-02-15', '456 Elm St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (3, '54321', true, 'Alice Johnson', '555-555-5557', 'female', '1990-03-20', '789 Oak St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (4, '98765', true, 'Bob Brown', '555-555-5558', 'male', '1975-04-25', '101 Pine St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (5, '13579', true, 'Charlie Davis', '555-555-5559', 'male', '1982-05-30', '202 Maple St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (6, '24680', true, 'Dana White', '555-555-5560', 'female', '1995-06-10', '303 Cedar St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (7, '11223', true, 'Eli Green', '555-555-5561', 'male', '1988-07-15', '404 Birch St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (8, '33445', true, 'Fiona Black', '555-555-5562', 'female', '1972-08-20', '505 Spruce St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (9, '55667', true, 'George Wilson', '555-555-5563', 'male', '1999-09-25', '606 Redwood St');

INSERT INTO patients (id, identifier, active, name, telecom, gender, birthDate, address) 
VALUES (10, '77889', true, 'Hannah Brown', '555-555-5564', 'female', '1981-10-30', '707 Cypress St');


