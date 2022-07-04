-- Drop and recreate Points table (Example)

DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
