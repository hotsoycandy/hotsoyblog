CREATE TABLE postLike(
  userIdx Int NOT NULL,
  postIdx Int NOT NULL,

  PRIMARY KEY(userIdx, postIdx),
  FOREIGN KEY(userIdx) REFERENCES user(idx),
  FOREIGN KEY(postIdx) REFERENCES post(idx)
);
