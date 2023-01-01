create table if not exists users (
    id serial primary key,
    name text not null,
    email text not null,
    password text not null
)

create table if not exists tasks (
    id serial primary key,
    description text not null,
    conpleted boolean not null default false
)