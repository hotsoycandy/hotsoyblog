CREATE TABLE user(
  idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname VARCHAR(20) NOT NULL,
  introduction VARCHAR(500),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);