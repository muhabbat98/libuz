create extension pgcrypto;
-- 01 users 
create table users(
    user_id serial primary key,
    username varchar(30) not null unique,
    password varchar(60) not null,
    user_status smallint not null
);
INSERT INTO users(username, password, user_status) VALUES ('bmp', crypt('123', gen_salt('bf')), 1);
INSERT INTO users(username, password, user_status) VALUES ('muazzam', crypt('123', gen_salt('bf')), 2);
INSERT INTO users(username, password, user_status) VALUES ('muhabbat', crypt('123', gen_salt('bf')), 3);


-- 02 libraries 
create table libraries(
    library_id serial primary key,
    library_name varchar(64) not null
);
INSERT INTO libraries(library_name) VALUES ('all');
INSERT INTO libraries(library_name) VALUES ('milliy kutubxona');


-- 03 librarians 
create table librarians(
    librarian_id serial primary key,
    user_id int not null references users(user_id),
    first_name varchar(40) not null,
    last_name varchar(40) not null,
    librarian_phone varchar(13) not null,
    library_id int references libraries(library_id)
);
INSERT INTO librarians(user_id, first_name, last_name, librarian_phone, library_id) VALUES (2, 'Muazzam', 'Abduqahhorova', 99639852147, 1);

--  04 reader roles  
create table reader_roles(
    reader_role_id serial primary key,
    reader_role varchar(64) not null
);
INSERT INTO reader_roles(reader_role) VALUES ('student');
-- 05 reader 
create table readers(
    reader_id serial primary key,
    user_id int references users(user_id),
    reader_email varchar(64),
    reader_role_id int references reader_roles(reader_role_id),
    reader_phone varchar(13)
);
INSERT INTO readers(user_id, reader_email, reader_role_id, reader_phone) VALUES (3, 'bmp@com', 1, 99639852147);

-- 06 themes of questions 
create table themes (
    theme_id serial primary key,
    theme_name varchar(64)
);
INSERT INTO readers(user_id, reader_email, reader_role_id, reader_phone) VALUES (3, 'bmp@com', 1, 99639852147);

-- 07 questions 
create table questions(
    question_id serial primary key,
    reader_id int references readers(reader_id),
    theme_id int references themes(theme_id),
    library_id int default null references libraries(library_id),
    question_text text not null,
    question_status smallint default 1,
    created_at timestamptz default current_timestamp 
);
INSERT INTO questions(reader_id, question_text) VALUES (1, '"hello"');

-- 08 rooms 
create table rooms (
    room_id serial primary key,
    librarian_id int references librarians(librarian_id),
    reader_id int references readers(reader_id)
);

-- 09 answers
create table answers(
    answer_id serial primary key,
    question_id int references questions(question_id),
    librarian_id int references librarians(librarian_id),
    room_id int references rooms(room_id),
    answer_text varchar not null,
    created_at timestamptz default current_timestamp
);
--10 likes
create table likes(
    like_id serial primary key,
    answer_id int references answers(answer_id),
    reader_id int references readers(reader_id)
);
