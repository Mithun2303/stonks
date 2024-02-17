drop table if EXISTS company;
drop table if exists products;
drop table if exists seller;
drop table if exists access_token;
drop table if exists company_seller;
drop table if exists seller_product;

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

create table IF NOT EXISTS company_seller(
    c_id varchar(255) references company(c_id),
    s_id varchar(255) references seller(s_id),
    primary key(s_id,c_id)

);
create table IF NOT EXISTS seller_product(
    s_id varchar(255) references seller(s_id),
    p_id varchar(255) references products(p_id),
    sold_stocks int,
    provided_stock int,
    constraint seller_stock_const check(sold_stocks>=0),
    primary key(s_id,p_id)
);

show tables;

insert into company values('1001','Apple','$2a$12$.wEHsgsz/2hkeCwuNhmzduzusgoyDD3UPT8VrxMMyB4DbBUlNrl2C',"inventory@apple.com");

insert into products values('10001','Apple iPhone 15 Pro Max (256 GB) - Blue Titanium','mobile',"https://firebasestorage.googleapis.com/v0/b/stonks-3bd69.appspot.com/o/Apple%20iPhone%2015%20Pro%20Max%20(256%20GB)%20-%20Blue%20Titanium.jpg?alt=media&token=6fdf160e-8191-4b38-a147-6d19fb762bc0",900,1000,'1001');
insert into products values('10002','Apple iPhone 11 (128GB) - Black','mobile',"https://firebasestorage.googleapis.com/v0/b/stonks-3bd69.appspot.com/o/Apple%20iPhone%2011%20(128GB)%20-%20Black.png?alt=media&token=6c095dc7-ca36-4496-b7ad-fce731ffec86",900,1000,'1001');
insert into products values('10003','Apple 2022 MacBook Air Laptop with M2 chip: 34.46 cm (13.6-inch) Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone/iPad; Midnight ','laptop',"https://firebasestorage.googleapis.com/v0/b/stonks-3bd69.appspot.com/o/Apple%202022%20MacBook%20Air%20Laptop%20with%20M2%20chip-%2034.46%20cm%20(13.6-inch)%20Liquid%20Retina%20Display%2C%208GB%20RAM%2C%20256GB%20SSD%20Storage%2C%20Backlit%20Keyboard%2C%201080p%20FaceTime%20HD%20Camera.%20Works%20with%20iPhone%20iPad%3B%20Midnight%20.jpg?alt=media&token=d1089835-5279-4975-a417-6581e5b44c4b",900,1000,'1001');
insert into products values('10004','Apple 2022 Mac Studio M1 Ultra chip with 20‑core CPU and 48‑core GPU, 64GB RAM, 1TB SSD - Silver ','mac studio',"https://firebasestorage.googleapis.com/v0/b/stonks-3bd69.appspot.com/o/Apple%202022%20Mac%20Studio%20M1%20Ultra%20chip%20with%2020%E2%80%91core%20CPU%20and%2048%E2%80%91core%20GPU%2C%2064GB%20RAM%2C%201TB%20SSD%20-%20Silver%20.jpg?alt=media&token=c49acdca-dd3a-40e8-9120-975711147c16",1000,1000,'1001');



insert into seller values('5001','ecommerce','John Doe',"johndoe@gmail.com","$2a$12$.wEHsgsz/2hkeCwuNhmzduzusgoyDD3UPT8VrxMMyB4DbBUlNrl2C");
insert into seller values('5002','ecommerce','Eric',"eric121@gmail.com",'$2a$12$.wEHsgsz/2hkeCwuNhmzduzusgoyDD3UPT8VrxMMyB4DbBUlNrl2C');
insert into seller values('5003','physical_store','Jason',"jasonschmith@gmail.com",'$2a$12$.wEHsgsz/2hkeCwuNhmzduzusgoyDD3UPT8VrxMMyB4DbBUlNrl2C');
insert into seller values('5004','marketplace','Marshal',"marshalmarsh@gmail.com",'$2a$12$.wEHsgsz/2hkeCwuNhmzduzusgoyDD3UPT8VrxMMyB4DbBUlNrl2C');


insert into company_seller values("1001","5001");
insert into company_seller values("1001","5002");
insert into company_seller values("1001","5003");
insert into company_seller values("1001","5004");

insert into seller_product values("5001","10001","100","0");
insert into seller_product values("5001","10003","100","0");
insert into seller_product values("5002","10002","100","0");
insert into seller_product values("5003","10004","0","300");