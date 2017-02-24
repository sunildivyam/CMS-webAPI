CREATE TABLE Tags
(
  TagId INT NOT NULL,
  Name VARCHAR(500) NOT NULL,
  Title VARCHAR(500) NOT NULL,
  Description VARCHAR,
  PRIMARY KEY (TagId),
  UNIQUE (Name)
);

CREATE TABLE Categories
(
  CategoryId INT NOT NULL,
  Name VARCHAR(500) NOT NULL,
  Title VARCHAR(500) NOT NULL,
  Description VARCHAR,
  PRIMARY KEY (CategoryId),
  UNIQUE (Name)
);

CREATE TABLE Contents
(
  ContentId INT NOT NULL,
  Name VARCHAR(500) NOT NULL,
  Title VARCHAR(500) NOT NULL,
  ShortDescription VARCHAR NOT NULL,
  Description VARCHAR NOT NULL,
  OwnerId VARCHAR(500) NOT NULL,
  IsLive INT NOT NULL,
  PublishedDate DATE NOT NULL,
  VisitCount INT NOT NULL,
  CategoryId INT NOT NULL,
  PRIMARY KEY (ContentId),
  FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

CREATE TABLE ContentTags
(
  ContentTagId INT NOT NULL,
  TagId INT NOT NULL,
  ContentId INT NOT NULL,
  PRIMARY KEY (ContentTagId),
  FOREIGN KEY (TagId) REFERENCES Tags(TagId),
  FOREIGN KEY (ContentId) REFERENCES Contents(ContentId)
);

CREATE TABLE AuthorContents
(
  AuthorContentId INT NOT NULL,
  ContentId INT,
  Name VARCHAR(500) NOT NULL,
  Title VARCHAR(500) NOT NULL,
  ShortDescription VARCHAR,
  Description VARCHAR,
  PublishedDate DATE,
  UpdatedDate DATE,
  AuthorId VARCHAR(500) NOT NULL,
  updateCount INT NOT NULL,
  CategoryId INT NOT NULL,
  PRIMARY KEY (AuthorContentId),
  FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

CREATE TABLE AuthorContentTags
(
  AuthorContentTagId INT NOT NULL,
  TagId INT NOT NULL,
  AuthorContentId INT NOT NULL,
  PRIMARY KEY (AuthorContentTagId),
  FOREIGN KEY (TagId) REFERENCES Tags(TagId),
  FOREIGN KEY (AuthorContentId) REFERENCES AuthorContents(AuthorContentId)
);
