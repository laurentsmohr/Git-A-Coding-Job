USE heroku_64557f9f8ac1154;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(25),
  PRIMARY KEY (id)
);

CREATE TABLE saved_jobs (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  type VARCHAR(100),
  description TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE users_savedjobs (
  user_id INT NOT NULL,
  saved_jobs_id INT NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (saved_jobs_id) REFERENCES saved_jobs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);



