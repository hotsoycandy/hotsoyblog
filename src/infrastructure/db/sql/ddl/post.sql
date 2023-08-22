CREATE TABLE post(
  idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  viewCount Int NOT NULL,
  thumbnailUrl TEXT,
  userIdx Int NOT NULL,
  slug VARCHAR(50) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(userIdx) REFERENCES user(idx)
);