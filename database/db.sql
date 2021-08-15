CREATE DATABASE challenge;

USE challenge;

CREATE TABLE users(
    iduser serial NOT NULL,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(60) NOT NULL,
    surname VARCHAR(60) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT user_iduser_pk PRIMARY KEY (iduser),
    CONSTRAINT username_unique UNIQUE (username)
);

CREATE TABLE public.links (
	idlink serial NOT NULL,
	title varchar(150) NOT NULL,
	utl varchar(250) NOT NULL,
	description text NULL,
	iduser int4 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	CONSTRAINT links_idink_pk PRIMARY KEY (idlink),
	CONSTRAINT links_users_fk FOREIGN KEY (iduser) REFERENCES public.users(iduser)
);