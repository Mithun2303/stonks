drop table if EXISTS company;
drop table if exists products;
drop table if exists seller;

CREATE TABLE IF NOT EXISTS company 
(
    c_id varchar(255) primary key,
    c_name varchar(255),
    password VARCHAR(255)
);

create table IF NOT EXISTS products
(
    p_id varchar(255) primary key,
    p_name varchar(255) not null,
    p_desc varchar(255),
    p_image varchar(512),
    avail_stock int,
    c_id varchar(255) references company(c_id),
    constraint stock_const check(avail_stock>0)
);

create table  IF NOT EXISTS seller(
    s_id varchar(255) PRIMARY KEY,
    s_type varchar(255) not null,
    c_id varchar(255) REFERENCES company(c_id),
    p_id varchar(255) REFERENCES products(p_id)
);

show tables;


insert into company values('1234','Apple','hello');