alter table submit
    alter column is_approved_by_school SET DEFAULT NULL;
alter table submit
    alter column is_approved_by_company SET DEFAULT NULL;

alter table internship
    add column is_closed BIT NOT NULL DEFAULT 0;
alter table internship
    add column end_date DATE DEFAULT NULL;
