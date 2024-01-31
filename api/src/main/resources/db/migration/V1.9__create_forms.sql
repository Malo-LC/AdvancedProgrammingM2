create table form
(
    id       int primary key auto_increment,
    title    varchar(255),
    deadline date
);

create table question
(
    id      int primary key auto_increment,
    form_id int,
    title   varchar(1000),
    type    enum ('TEXT', 'QCM'),
    foreign key (form_id) references form (id)
);

create table user_form
(
    id                         int primary key auto_increment,
    student_internship_id      int,
    form_id                    int,
    is_completed               BOOLEAN,
    is_signed_by_tutor_school  BOOLEAN,
    is_signed_by_tutor_company BOOLEAN,
    is_signed_by_student       BOOLEAN,
    foreign key (student_internship_id) references student_internship (id),
    foreign key (form_id) references form (id)
);

create table answer
(
    id           int primary key auto_increment,
    question_id  int,
    user_form_id int,
    value        varchar(1000),
    foreign key (user_form_id) references user_form (id),
    foreign key (question_id) references question (id)
);
