-- Drop and recreate Maps table (Example)

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  creator_id INTEGER REFERENCES users(id) NOT NULL
);
