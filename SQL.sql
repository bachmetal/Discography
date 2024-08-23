CREATE DATABASE discography;
use discography;

CREATE TABLE artist
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    NAME           VARCHAR(250) NOT NULL,
    thumbnailphoto VARCHAR(500)
);

CREATE TABLE album
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    NAME           VARCHAR(250) NOT NULL,
    thumbnailphoto VARCHAR(500),
    year           YEAR,
    ArtistId       INT,
    FOREIGN KEY (ArtistId) REFERENCES artist (id)
);

CREATE TABLE song
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    NAME    VARCHAR(250) NOT NULL,
    albumid INT,
    FOREIGN KEY (albumid) REFERENCES album (id)
);

CREATE TABLE style
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(250) NOT NULL
);

CREATE TABLE genre
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(250) NOT NULL
);

CREATE TABLE hasstylealbum
(
    styleid INT,
    albumid INT,
    FOREIGN KEY (styleid) REFERENCES style (id),
    FOREIGN KEY (albumid) REFERENCES album (id),
    PRIMARY KEY (styleid, albumid)
);

CREATE TABLE hasgenrealbum
(
    albumid INT,
    genreid INT,
    FOREIGN KEY (albumid) REFERENCES album (id),
    FOREIGN KEY (genreid) REFERENCES genre (id),
    PRIMARY KEY (albumid, genreid)
);


INSERT INTO artist(name, thumbnailPhoto)
VALUES ("Slipknot",
        "https://e-cdns-images.dzcdn.net/images/artist/7a66231b65ed2a4040991bf5730c4826/500x500-000000-80-0-0.jpg"),
       ("Metallica",
        "https://cdns-images.dzcdn.net/images/artist/b4719bc7a0ddb4a5be41277f37856ae6/500x500-000000-80-0-0.jpg"),
       ("Five Finger Death Punch",
        "https://cdns-images.dzcdn.net/images/artist/9de74fe4dcb22adfc4dab26ea1f7c02c/500x500-000000-80-0-0.jpg");

INSERT INTO album(name, year, thumbnailphoto, ArtistId)
VALUES ("Live At MSG", 2023,
        "https://i.discogs.com/S09_sXWJxUNqWyNtyMvB0tzgsG6eaGud_qd5iGLcGuY/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4MDEz/NDIxLTE2OTI0MTI4/NzItODQ1NS5qcGVn.jpeg",
        1),
       ("The End, So Far", 2022,
        "https://i.discogs.com/krDikY3-91ul7v1Oga-HkwQe2_kcGSCs45X36e6iAg4/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0NjUy/MTI0LTE2NjQ1Njk5/MDctODc3MC5qcGVn.jpeg",
        1),
       ("Paris, France May 17, 2023", 2023,
        "https://i.discogs.com/nQD6pCDZkonCnw7kwe0f9m11UvDBRf6JFfIBeynLy-c/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI3NzM3/NzA2LTE2ODk5MzAx/OTMtMzMzNC5qcGVn.jpeg",
        2),
       ("Las Vegas", 2022,
        "https://i.discogs.com/5kUjXYw-XIUSTINOPzK4jOKwJAjlTY13axFxESE9_-o/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzMDEy/OTQ1LTE2NTA5MzI4/ODYtMzU4My5qcGVn.jpeg",
        2),
       ("AfterLife", 2024,
        "https://i.discogs.com/N81BlTVdNHjjywhXBZEjS9Q-j7bEiWK0DyTqBKGP980/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MjM3/MjkwLTE2NjA4MjQx/MDAtNTc5NS5qcGVn.jpeg",
        3),
       ("The Wrong Side Of Heaven And The Righteous Side Of Hell, Volume 2", 2023,
        "https://i.discogs.com/i2tGxm6koOpjdP-JMLUFn7hYiJ9kyUqQqrS40PkONls/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUxMzg0/MzktMTM5MjM0OTQ0/OS04NjAzLmpwZWc.jpeg",
        3);

INSERT INTO song(name, albumId)
VALUES ("Here To Die", 6),
       ("Weight Beneath My Sin", 6),
       ("Wrecking Ball", 6);

INSERT INTO song(name, albumId)
VALUES ("Welcome To The Circus", 5),
       ("Afterlife", 5),
       ("Times Like These", 5);

INSERT INTO song(name, albumId)
VALUES ("For Whom The Bell Tolls", 3),
       ("Ride The Lightning", 3),
       ("Holier Than Thou", 3);

INSERT INTO song(name, albumId)
VALUES ("Whiplash", 4),
       ("Ride the Lightning", 4),
       ("The memory remains", 4);

INSERT INTO song(name, albumId)
VALUES ("Adderall", 2),
       ("The Dying Song (Time To Sing)", 2),
       ("The Chapeltown Rag", 2);

INSERT INTO song(name, albumId)
VALUES ("(Sic)", 1),
       ("Eyeless", 1),
       ("Wait And Bleed", 1);

INSERT INTO style (name)
VALUES ("Nu Metal"),
       ("Heavy Metal"),
       ("Thrash");

INSERT INTO genre (name)
VALUES ("Rock");

INSERT INTO hasstylealbum (styleid, albumid)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (2, 4),
       (3, 4),
       (3, 3),
       (2, 5),
       (2, 6);
INSERT INTO hasgenrealbum (albumid, genreid)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1);