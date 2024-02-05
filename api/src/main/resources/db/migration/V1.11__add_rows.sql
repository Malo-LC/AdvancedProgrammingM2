# Password : 1234
INSERT INTO user (id, email, first_name, last_name, password, role, profile_picture_filedb_id, phone_number,
                  promotion_id)
VALUES (1, 'admin@example.com', 'John', 'Doe', '$2a$10$djuA4wLmIP/I7DJNaeo.4.BgitdBRlsVpJ3mj5NmZumwptVrXGOgK', 'ADMIN',
        null, '+123456789', null);

INSERT INTO user (id, email, first_name, last_name, password, role, profile_picture_filedb_id, phone_number,
                  promotion_id)
VALUES (2, 'jane.smith@example.com', 'Jane', 'Smith', '$2a$10$djuA4wLmIP/I7DJNaeo.4.BgitdBRlsVpJ3mj5NmZumwptVrXGOgK',
        'TUTOR', null, '+987654321', null);

INSERT INTO user (id, email, first_name, last_name, password, role, profile_picture_filedb_id, phone_number,
                  promotion_id)
VALUES (3, 'alice.jones@example.com', 'Alice', 'Jones', '$2a$10$djuA4wLmIP/I7DJNaeo.4.BgitdBRlsVpJ3mj5NmZumwptVrXGOgK',
        'TUTOR', null, '+111222333', null);

INSERT INTO user (id, email, first_name, last_name, password, role, profile_picture_filedb_id, phone_number,
                  promotion_id)
VALUES (4, 'bob.miller@example.com', 'Bob', 'Miller', '$2a$10$djuA4wLmIP/I7DJNaeo.4.BgitdBRlsVpJ3mj5NmZumwptVrXGOgK',
        'TUTOR', null, '+444555666', null);

INSERT INTO user (id, email, first_name, last_name, password, role, profile_picture_filedb_id, phone_number,
                  promotion_id)
VALUES (5, 'emma.wilson@example.com', 'Emma', 'Wilson', '$2a$10$djuA4wLmIP/I7DJNaeo.4.BgitdBRlsVpJ3mj5NmZumwptVrXGOgK',
        'TUTOR', null, '+777888999', null);

INSERT INTO form (id, title, deadline)
VALUES (1, 'Formulaire web', '2024-04-04');
INSERT INTO question (id, form_id, title, type)
VALUES (1, 1, 'Comment vous sentez vous dans l\'entreprise?', 'TEXT');
INSERT INTO question (id, form_id, title, type)
VALUES (2, 1, 'Accepteriez vous de travailler dans ce domaine dans le futur ?', 'QCM');
INSERT INTO question (id, form_id, title, type)
VALUES (3, 1, 'Décrivez votre mission', 'TEXT');

update user_seq
set next_val = 6;
update form_seq
set next_val = 2;
update question_seq
set next_val = 4;
