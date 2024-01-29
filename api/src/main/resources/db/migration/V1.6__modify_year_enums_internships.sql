alter table internship
    drop column year;
alter table internship
    drop column promotion_year;

alter table internship
    add column year enum ('L1','L2','L3','M1','M2') DEFAULT NULL;
alter table internship
    add column promotion_year int DEFAULT NULL;

update internship
set year           = 'L1',
    promotion_year = 2023
where id = 1;
update internship
set year           = 'L2',
    promotion_year = 2023
where id = 2;
update internship
set year           = 'L3',
    promotion_year = 2023
where id = 3;
update internship
set year           = 'M1',
    promotion_year = 2023
where id = 4;
update internship
set year           = 'M2',
    promotion_year = 2023
where id = 5;
