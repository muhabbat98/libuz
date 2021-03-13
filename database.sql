create extention pgcrypto;

create table users(
    user_id serial primary key,
    username varchar(30) not null unique,
    password varchar(45) not null,
    is_admin boolean default false
);
create table libraries(
    library_id serial primary key,
    library_name varchar(64) not null,
)
create table librarians(
    librarian_id serial primary key,
    user_id int not null reference users(user_id),
    first_name varchar(40) not null,
    last_name varchar(40) not null,
    librarian_phone varchar(13) not null,
    library_id int reference libraries(librarian_id)
)