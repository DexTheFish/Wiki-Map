-- Drop and recreate favourite_maps table (Example)

DROP TABLE IF EXISTS favourite_maps CASCADE;
CREATE TABLE favourite_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL
);
