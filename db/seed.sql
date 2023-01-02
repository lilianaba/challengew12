INSERT INTO department (name)
VALUES ("Sales"),
       ("Accounting"),
       ("Operations"),
       ("Support"),
       ('Development');

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Manager",68000,1),
       ("Sales Agent",62000,1),
       ("Accountant",70000,2),
       ("Finance Manager",75000,2),
       ("Operations Manger",85000,3),
       ("Consultant",80000,3),
       ("Support Agent",60000,4),
       ("Support Manager",65000,4),
       ("Senior Developer",83000,5),
       ("Junior Developer",73000,5);


INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ("Lola","Garcia",1,NULL),
       ("Michael","Hang",2,1),
       ("Tomas","Krol",4,NULL),
       ("Gaby","Salas",3,3),
       ("Jane","Curtis",5,NULL),
       ("Mona","Lisa",6,5),
       ("Roberta","Smith",8,NULL),
       ("Billy","Wang",7,8),
       ("Dom","Suarez",9,NULL),
       ("Dona","Castro",10,NULL),
       ("Nico","Tano",6,5),
       ("George","Moore",6,5);

