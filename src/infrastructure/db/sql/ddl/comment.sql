CREATE TABLE comment(
  idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userIdx Int NOT NULL,
  postIdx Int NOT NULL,
  parentCommentIdx Int NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY(userIdx) REFERENCES user(idx),
  FOREIGN KEY(postIdx) REFERENCES post(idx),
  FOREIGN KEY(parentCommentIdx) REFERENCES comment(idx)
);