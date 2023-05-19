create table if not exists user(guid text, githublogin text, name text, avatar text, PRIMARY KEY (guid));
create table if not exists photos(guid text, created text, description text, name text, postedby text CONSTRAINT fk_user REFERENCES user (guid), category text, PRIMARY KEY (guid));
create table if not exists tags(photo text CONSTRAINT fk_photos REFERENCES photos (guid), user text CONSTRAINT fk_user REFERENCES user (guid), PRIMARY KEY (photo, user));
insert into user values ('125040b6-2967-4d5c-8544-52490b7af5f3','ethanmsmith','ethan','unknown.jpg');
insert into photos values ('eee4b172-2cc8-400b-a73b-560189f0fbd8', '2023-05-09','A close up photo of a blood moon','Blood Moon','125040b6-2967-4d5c-8544-52490b7af5f3','nature');
insert into tags values ('eee4b172-2cc8-400b-a73b-560189f0fbd8','125040b6-2967-4d5c-8544-52490b7af5f3');