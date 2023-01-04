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
const db2 = mysql.createConnection(
  {
      host:'localhost',
      user:'root',
      password:'root',
      database:'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker database`)
).promise();

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



///////////////////////////////////
const managers = async () => {
  const managersSelect = `SELECT concat( first_name,', ',last_name) Manager FROM employee where manager_id is null`;
  const managersOptions = await db2.query(managersSelect);
  console.log(managersOptions);
  return managersOptions[0];
};  




const viewEmployeesByManager = async () => {
  inquirer.prompt([
    {
       type: 'list',
       name: 'manager',
       message:"Select a manager: " ,
       choices: await managers(),
     },      
   ])
   .then(nextStep => {
    const sql = `SELECT e.id ID, e.first_name First_Name, e.last_name Last_Name, r.title Role,
                 CONCAT('$', FORMAT(r.salary, 2)) Salary ,d.name DeptName
                FROM role r, 
                     department d,
                     employee e
                WHERE e.manager_id = (select id from employee where concat( first_name,', ',last_name) = ${nextStep.manager} )
                AND r.department_id = d.id
                AND e.role_id = r.id
                ORDER BY e.last_name`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table(rows);
    startApp();
    }) 

     })
    };

  
 /////////////////////////////////
    
 
const viewEmployeesByDepartment = () => {
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

const updateEmployeeManager = () => {

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

const addRole = () => {

};

const viewDepartments = () => {
  const sql =  `select d.id ID,d.name DeptName
                  from department d`;
  db.query(sql,(err,rows) => {
    if(err) console.log(err)
    console.table(rows);
  startApp();
  })
};

const budgetByDepartment = () => {
  const sql =  `select d.id ID,d.name DeptName
                  from department d`;
  db.query(sql,(err,rows) => {
    if(err) console.log(err)
    console.table(rows);
  startApp();
  })
};



// The App
const startApp = () =>{
    inquirer.prompt([
      {
         type: 'list',
         name: 'start',
         message:"What would you like to do?" ,
         choices:['View all employees*',
                  'View employees by Manager**',
                  'View employees by Department',
                  'Add employee',
                  'Update employee role',
                  'Update employee manager',
                  'View all roles*',
                  'Add new role',
                  'View all departments*',
                  'Add new department',
                  'View total budget by department',
                  'Quit']
       },      
     ])
     .then(nextStep => {
       switch (nextStep.start) {
        case "View all employees":
            viewEmployees();
            break;

        case "View employees by Manager":
            viewEmployeesByManager();
            break;

        case "View employees by Department":
          viewEmployeesByDepartment();
          break;
 
        case "Add employee":
           addEmployee();
           break;
        
        case "Update employee role":
           updateEmployeeRole();
           break;

        case "Update employee manager":
           updateEmployeeManager();
           break;

        case "View all roles":
           viewRoles();
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

        case "View total budget by department":
           budgetByDepartment();
           break;
        
        default:
          console.log('Bye Bye!!')
          process.exit();
        };
     })
 };

 startApp();
 


// Delete departments, roles, and employees.

