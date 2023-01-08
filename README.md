# 12 This is Challenge #12 Employee Tracker Program 🎉

## Table of Contents 
- [Your task](#Your-Task-)
- [User Story ](#user-story-)
- [Acceptance Criteria](#acceptance-criteria-)
- [Mock Up 📷](#Mock-Up-)
- [Installation Instructions 📣](#Installation-)
- [Credits 🧑‍🤝‍🧑](#credits-)
- [Questions](#questions-)
- [License ©️](#license-️)
----

## Live Site
[Repo Site](https://github.com/lilianaba/challengew12)
    
----    
## Your Task
    
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.


-----
## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business


----
## Acceptance Criteria

* GIVEN a command-line application that accepts user input
* WHEN I start the application
* THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
* THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
* THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
* THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
* THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
* THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
* THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
* THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
* Update employee managers.
* WHEN I am prompted to select an employee by Manager 
* THEN I am prompted to select a manager to view his/her employees.
* WHEN I am prompted to select an employee by Department
* THEN I am prompted to select a department and the program will list all employee by that department
* WHEN I am prompted to select an Delete
* THEN I am prompted to select to delete employees, roles or departments and the program will ask the id of the element to delete
* Then I am prompted to select View total budget by department
    
----
## Mock-Up

![Database mock-up](./assets/images/12-sql-homework-demo-01.png)    

[Demo Video](https://drive.google.com/file/d/1OP4koCpzlb2697pBhaqOB-vpSBvcIKfE/preview)

----
## Installation
* npm i -- to install node, 
* then npm i inquirer to  install inquierer  and the version
* then npm install console.table --save
* then mysql -u root -p
* enter password
* then source db/schema.sql
* then source db/seed.sql
* then npm start (to start the program) and follow the instructions answers

-----
## Credits

[Liliana Bazand](https://github.com/lilianaba)

----
## Questions ❔
Contact me: lilianabazand@yahoo.com


----
# License
MIT License 
Copyright (c) [2022] [Liliana Bazand]
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.