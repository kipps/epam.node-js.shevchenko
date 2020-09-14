CREATE TABLE users(
     ID SERIAL PRIMARY KEY,
     LOGIN VARCHAR (20)     NOT NULL,
     AGE  INT              NOT NULL,
     PASSWORD  VARCHAR (20) ,
     ISDELETED   BOOLEAN DEFAULT FALSE
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name text,
    premissions text[] NOT NULL
);

CREATE TABLE user_group (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id) ON UPDATE CASCADE,
    group_id integer REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (AGE, LOGIN, PASSWORD, ISDELETED)
VALUES (28, 'Tom', 'sWdw34ssw', false);

INSERT INTO users (AGE, LOGIN, PASSWORD, ISDELETED)
VALUES (32, 'Dasha', 'efewfe', false);

INSERT INTO users (AGE, LOGIN, PASSWORD, ISDELETED)
VALUES (19, 'Tommas', 'dfeererr3', false);

INSERT INTO users (AGE, LOGIN, PASSWORD, ISDELETED)
VALUES (51, 'Peter', 'weerrrr', false);

INSERT INTO users (AGE, LOGIN, PASSWORD, ISDELETED)
VALUES (26, 'Zet', 'fd34433', false);

INSERT INTO users (AGE, LOGIN, PASSWORD, ISDELETED)
VALUES (18, 'Anna', 'rew433', false);
