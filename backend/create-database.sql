-- Run this SQL in pgAdmin or any PostgreSQL client to create the database

-- Create the database
CREATE DATABASE orderking
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE orderking IS 'OrderKing Egypt E-commerce Database';
