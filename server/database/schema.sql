USE heroku_9df31bbf76f2ea7;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) UNIQUE,
  password VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE saved_jobs (
  id VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  location VARCHAR(100),
  type VARCHAR(100),
  description TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE users_savedjobs (
  user_id INT NOT NULL,
  saved_jobs_id VARCHAR(100) NOT NULL,
  FOREIGN KEY (saved_jobs_id) REFERENCES saved_jobs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);



