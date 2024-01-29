create table promotion
(
    id             int not null auto_increment,
    promotion_class          enum ('L1','L2','L3','M1','M2') DEFAULT NULL,
    promotion_year int                             DEFAULT NULL,
    primary key (id)
);

insert into promotion (promotion_class, promotion_year)
values ('L1', 2028);
insert into promotion (promotion_class, promotion_year)
values ('L2', 2027);
insert into promotion (promotion_class, promotion_year)
values ('L3', 2026);
insert into promotion (promotion_class, promotion_year)
values ('M1', 2025);
insert into promotion (promotion_class, promotion_year)
values ('M2', 2024);

alter table internship
    drop column year;
alter table internship
    drop column promotion_year;

alter table user
    drop column promotion_year;

alter table internship
    add column promotion_id int;
alter table internship
    add constraint FK_internship_promotion
        foreign key (promotion_id) references promotion (id);

alter table user
    add column promotion_id int;
alter table user
    add constraint FK_user_promotion
        foreign key (promotion_id) references promotion (id);
