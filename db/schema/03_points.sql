-- Drop and recreate Points table (Example)

DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  longitude DECIMAL NOT NULL,
  latitude DECIMAL NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL
);
