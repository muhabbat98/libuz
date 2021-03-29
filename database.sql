create extention pgcrypto;
-- 01 users 
create table users(
    user_id serial primary key,
    username varchar(30) not null unique,
    password varchar(45) not null,
    is_admin boolean default false
);
-- 02 libraries 
create table libraries(
    library_id serial primary key,
    library_name varchar(64) not null,
);
-- 03 librarians 
create table librarians(
    librarian_id serial primary key,
    user_id int not null reference users(user_id),
    first_name varchar(40) not null,
    last_name varchar(40) not null,
    librarian_phone varchar(13) not null,
    library_id int reference libraries(librarian_id)
);

--  04 reader roles  
create table reader_roles(
    reader_role_id serial primary key,
    reader_role varchar(64) not null
);
-- 05 reader 
create table readers(
    reader_id serial primary key,
    user_id int reference users(user_id),
    reader_email varchar(64),
    reader_role int reference reader_roles(reader_role_id),
    reader_phone varchar(13)
);
-- 06 themes of questions 
create table themes (
    theme_id serial primary key,
    theme_name varchar(64)
);
-- 07 questions 
create table questions(
    question_id serial primary key,
    reader_id int reference readers(reader_id),
    theme_id int reference themes(theme_id),
    library_id int reference libraries(library_id),
    question_text text not null,
    question_status smallint default 1,
    created_at timestamptz default current_timestamp 
);

-- 08 rooms 
create table rooms (
    room_id serial primary key,
    librarian_id int reference librarians(librarian_id),
    reader_id int reference readers(reader_id)
);

-- 09 answers
create table answers(
    answer_id serial primary key,
    question_id int reference questions(question_id),
    librarian_id int reference librarians(librarian_id),
    room_id int reference rooms(room_id),
    answer_text varchar not null,
    created_at timestamptz default current_timestamp
);
