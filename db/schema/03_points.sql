-- Drop and recreate Points table (Example)

DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  description TEXT,
  img_url VARCHAR(255),
  longitude DECIMAL,
  latitude DECIMAL,
  active BOOLEAN DEFAULT TRUE,
  map_id INTEGER REFERENCES maps(id)
);
