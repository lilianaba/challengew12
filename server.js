const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//connecting to the database
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root',
        database:'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker database`)
);


//Program functions
const viewEmployees = () => {
  const sql = `SELECT e.id ID, e.first_name First_Name, e.last_name Last_Name, r.title Role,
               CONCAT('$', FORMAT(r.salary, 2)) Salary ,d.name DeptName, IFNULL(m.manager,'') Manager
               FROM role r, 
                    department d,
                    employee e
               LEFT JOIN (SELECT concat( first_name,', ',last_name) Manager , id 
                          FROM employee) m
               ON e.manager_id = m.id
               WHERE r.department_id = d.id
               AND e.role_id = r.id
               ORDER BY e.last_name, salary`;
  db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table(rows);
    startApp();
  })
  
  };
  
const addEmployee = () => {
    return inquirer.prompt([
          { type: 'input',
            name: 'name',
            message: "What is the team intern's name?",
            validate: mname => {
              if (mname) {
                return true;
              }else{
                console.log('Please enter a name');
                return false;
              }
            }
         },
              
          {
            type: 'input',
            name: 'id',
            message:"What is the team intern's ID?" ,
            validate: id => {
             // (isNaN(parseInt(
              if (!isNaN(id) === true ) {
                return true;
              }else {
                console.log('Please enter a valid employee ID');
                return false;
              }
            }
         },
               
          {
            type: 'input',
            name: 'email',
            message:"What is the team intern's email?" ,
            validate: email =>{
              if (emailValidator.validate((email))) {
                return true;
              }else{
                console.log('Please enter a valid email');
                return false;
              }
            },
    
          },
        
          {
            type: 'input',
            name: 'school',
            message:"What is the team intern's school?" ,
          },
        
        ])
          .then((int)=>{
            //   console.log(response);
          const intern = new Intern(int.name, int.id,int.email, int.school);
          const internCard = (`<card class="card col-sm-12 col-md-3 col-lg-3 flex justify-content-center">
          <div class="cardHeader text-center">
              <!-- Name and role -->
              <h2 class="cardName">${intern.name}</h2>
              <h5 class="cardRole text-white bg-warning">${intern.getRole()}</h5>
          </div>
          <div class="cardBody text-center">
              <ul class="list-group">
              <!-- Id, Email, OfficeNumber/GitHub/School-->
                  <li class="list-group-item">ID: ${intern.id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}" title="mailto:${intern.getEmail()}"> ${intern.getEmail()} </a> </li>
                  <li class="list-group-item">School: ${intern.school}</li>
              </ul>
          </div>
      </card>`)
          teamMembers.push(internCard);
  
         // validate info collect and store
          // console.log(teamMembers)
  
  
          teamMembersBuild();
  
             
            });
  
  };

const updateEmployeeRole = () => {

};

const viewRoles = () => {
  const sql =  `select r.id ID,r.title Title, CONCAT('$', FORMAT(r.salary, 2)) Salary ,d.name DeptName
                  from role r, department d
                  where r.department_id = d.id`;
  db.query(sql,(err,rows) => {
    if(err) console.log(err)
    console.table(rows);
  startApp();
  })
};
const viewEmployee = () => {

};

const addRole = () => {

};

const viewDepartments = () => {

};





// The App
const startApp = () =>{
    inquirer.prompt([
      {
         type: 'list',
         name: 'start',
         message:"What would you like to do?" ,
         choices:['View all employees',
                  'Add employee',
                  'Update employee role',
                  'View all roles',
                  'Add new role',
                  'View all departments',
                  'Add new department',
                  'Quit']
       },      
     ])
     .then(nextStep => {
       switch (nextStep.start) {
        case "View all employees":
            viewEmployees();
            break;
 
        case "Add employee":
           addEmployee();
           break;
        
        case "Update employee role":
           updateEmployeeRole();
           break;

        case "View all roles":
           viewRoles();
           break;
        case "View all employees":
            viewEmployee();
            break;
 
        case "Add new role":
           addRole();
           break;
        
        case "View all departments":
           viewDepartments();
           break;

        case "Add new department":
           addDepartment();
           break;
        
        default:
          //  quit();
           console.log('Bye Bye!!')

           break;
        };
     })
 };

 startApp();
 