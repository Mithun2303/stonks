drop table if EXISTS company;
drop table if exists products;
drop table if exists seller;
drop table if exists access_token;


CREATE TABLE IF NOT EXISTS company 
(
    c_id varchar(255) primary key,
    c_name varchar(255),
    password VARCHAR(255),
    email varchar(255)
);

create table IF NOT EXISTS products
(
    p_id varchar(255) primary key,
    p_name varchar(255) not null,
    p_desc varchar(255),
    p_image varchar(512),
    avail_stock int,
    total_stock int,
    c_id varchar(255) references company(c_id),
    constraint stock_const check(avail_stock>0)
);
create table IF NOT EXISTS company_seller(
    c_id varchar(255) references company(c_id),
    s_id varchar(255) references seller(s_id),
    primary key(s_id,c_id)
    
);
create table IF NOT EXISTS seller_product(
    s_id varchar(255) references seller(c_id),
    p_id varchar(255) references products(s_id),
    sold_stocks int,
    constraint seller_stock_const check(sold_stocks>=0),
    primary key(s_id,p_id)
);
create table  IF NOT EXISTS seller(
    s_id varchar(255) PRIMARY KEY,
    s_type varchar(255) not null,
    s_name varchar(255) not null,
    s_mail varchar(255),
    s_pwd varchar(255),
    constraint type_check check(s_type in ('ecommerce','physical_store','marketplace'))
);

create table IF NOT EXISTS access_token(
    session_id VARCHAR(255),
    c_id VARCHAR(255) REFERENCES company(c_id),
    primary key(session_id,c_id)
);


show tables;

insert into company values('1234','Apple','$2a$12$qW4ZpXWquqSHaOA8IgRYAu.yxiJ3KoYEK0GPPa9T9IIPdJaucP.aC',"inventory@apple.com");

-- insert into products values('100','Apple iPhone 15 Pro Max (256 GB) - Blue Titanium','mobile',null,100,'1234');
-- insert into products values('101','Apple iPhone 11 (128GB) - Black','mobile',null,50,'1234');
-- insert into products values('102','Apple 2022 MacBook Air Laptop with M2 chip: 34.46 cm (13.6-inch) Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone/iPad; Midnight ','laptop',null,35,'1234');
-- insert into products values('103','Apple 2022 Mac Studio M1 Ultra chip with 20‑core CPU and 48‑core GPU, 64GB RAM, 1TB SSD - Silver ','mac studio',null,40,'1234');


-- insert into seller values('5000','ecommerce','1234','100');
-- insert into seller values('5001','ecommerce','1234','101');
-- insert into seller values('5002','physical_store','1234','102');
-- insert into seller values('5003','marketplace','1234','103');