insert into internship (id, promotion_year, title, year)
values (1, 'L1', 'Stage d\'éxecution', 2023),
       (2, 'L2', 'Stage commercial', 2023),
       (3, 'L3', 'Stage', 2023),
       (4, 'M1', 'Stage de six mois', 2023),
       (5, 'M2', 'Stage de fin d\'études', 2023);

update internship_seq set next_val=6 where next_val=1;
