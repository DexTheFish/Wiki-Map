-- Drop and recreate contributions table (Example)

DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  point_id INTEGER REFERENCES points(id) NOT NULL,
  contribution_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
