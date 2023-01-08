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
// const managers = async () => {
//   const managersSelect = `SELECT concat( first_name,', ',last_name) Manager, id FROM employee where manager_id is null`;
//   const managersOptions = await db2.query(managersSelect);
//   console.log(managersOptions[0]);
//   return managersOptions[0];
// };  

// findAllEmployees(){
//   return this.connection.promise().query(
//     "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
//   )
//   };

// function viewEmployeesByManager() {
//   db.findAllEmployees()
//     .then(([rows]) => {
//       let managers = rows;
//       const managerChoices = managers.map(({ id, first_name, last_name }) => ({
//         name: `${first_name} ${last_name}`,
//         value: id
//       }));

//       prompt([
//         {
//           type: "list",
//           name: "managerId",
//           message: "Which employee do you want to see direct reports for?",
//           choices: managerChoices
//         }
//       ])
//  .then(res => db.findAllEmployeesByManager(res.managerId))
//         .then(([rows]) => {
//           let employees = rows;
//           console.log("\n");
//           if (employees.length === 0) {
//             console.log("The selected employee has no direct reports");
//           } else {
//             console.table(employees);
//           }
//         })
//         .then(() => loadMainPrompts())
//     });
//   };


// const viewEmployeesByManager = async () => {
//   // const managers = async () => {
//     const managersSelect = `SELECT concat( first_name,', ',last_name) Manager, id FROM employee where manager_id is null`;
//     db2.query(managersSelect).then(([rows])=>{
//       inquirer.prompt([
//         {
//            type: 'list',
//            name: 'manager',
//            message:"Select a manager: " ,
//            choices:rows,
//          },      
//        ])
//     })
//     // console.log(managersOptions[0]);
//     // return managersOptions[0];
//   // };  
 
//    .then(nextStep => {
//     const sql = `SELECT e.id ID, e.first_name First_Name, e.last_name Last_Name, r.title Role,
//                  CONCAT('$', FORMAT(r.salary, 2)) Salary ,d.name DeptName
//                 FROM role r, 
//                      department d,
//                      employee e
//                 WHERE e.manager_id = (select id from employee where concat( first_name,', ',last_name) = ${nextStep.manager} )
//                 AND r.department_id = d.id
//                 AND e.role_id = r.id
//                 ORDER BY e.last_name`;

//     db.query(sql,(err,rows) =>{
//     if(err) console.log(err)
//     console.table(rows);
//     startApp();
//     }) 

//      })
//     };



const viewEmployeesByManager = async () => {
  // const managers = async () => {
    const managersSelect = `SELECT concat( first_name,', ',last_name) Manager, id ID FROM employee where manager_id is null`;
    
    db2.query(managersSelect).then(([rows])=>{
      console.log("this is the console table:");
      console.log(rows);
      // console.table(rows);
      inquirer.prompt([
        {
           type: 'list',
           name: 'manager',
           message:"Select a manager: " ,
           choices:rows,
         },      
       ])
    })
    // console.log(managersOptions[0]);
    // return managersOptions[0];
  // };  
 
   .then(nextStep => {
    // const sql = `SELECT e.id ID, e.first_name First_Name, e.last_name Last_Name, r.title Role,
    //              CONCAT('$', FORMAT(r.salary, 2)) Salary ,d.name DeptName
    //             FROM role r, 
    //                  department d,
    //                  employee e
    //             WHERE e.manager_id = (select id from employee where concat( first_name,', ',last_name) = ${nextStep.manager} )
    //             AND r.department_id = d.id
    //             AND e.role_id = r.id
    //             ORDER BY e.last_name`;

    const sql =  `select e.id ID, e.first_name, e.last_name, d.name DeptName, r.title Role, CONCAT('$', FORMAT(r.salary, 2)) Salary 
                  from employee e 
                  left join role 
                    on r.id = e.role_id 
                  left join department 
                    on d.id = r.department_id 
                  where e.manager_id ${nextStep.manager}`;

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


const updateFirst =()=>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message:"Enter employee ID" ,
              validate: employee_id => {
                 if (!isNaN(employee_id) === true ) {
                 return true;
                 }else {
                  console.log('Please enter a valid employee ID');
                  return false;
                  }}
     },
    { 
      type: 'input',
      name: 'newvalue',
      message:"Enter updated value" ,
                validate: newvalue => {
                    if (newvalue) {
                      return true;
                    }else{
                      console.log('Please enter a valid name');
                      return false;
                    }
              },
      },
   ]).then(updateStep =>{
           const sql = `update employee set first_name ='${updateStep.newvalue}' where id = ${updateStep.employee_id}`;

          db.query(sql,(err,rows) =>{
          if(err) console.log(err)
          console.table("Employee Updated");
          startApp();
          })

      })
};

const updateLast =()=>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message:"Enter employee ID" ,
              validate: employee_id => {
                 if (!isNaN(employee_id) === true ) {
                 return true;
                 }else {
                  console.log('Please enter a valid employee ID');
                  return false;
                  }}
     },
    { 
      type: 'input',
      name: 'newvalue',
      message:"Enter updated value" ,
                validate: newvalue => {
                    if (newvalue) {
                      return true;
                    }else{
                      console.log('Please enter a valid name');
                      return false;
                    }
              },
      },
   ]).then(updateStep =>{
           const sql = `update employee set last_name ='${updateStep.newvalue}' where id = ${updateStep.employee_id}`;

          db.query(sql,(err,rows) =>{
          if(err) console.log(err)
          console.table("Employee Updated");
          startApp();
          })

      })
};

const updateRoleID =()=>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message:"Enter employee ID" ,
              validate: employee_id => {
                 if (!isNaN(employee_id) === true ) {
                 return true;
                 }else {
                  console.log('Please enter a valid employee ID');
                  return false;
                  }}
     },
    { 
      type: 'input',
      name: 'newvalue',
      message:"Enter updated value" ,
                validate: newvalue => {
                if (!isNaN(newvalue) === true ) {
                  return true;
          
                }else {
                  console.log('Please enter a valid employee ID');
                  return false;
                }}
      },
   ]).then(updateStep =>{
           const sql = `update employee set role_id = ${updateStep.newvalue} where id = ${updateStep.employee_id}`;

          db.query(sql,(err,rows) =>{
          if(err) console.log(err)
          console.table("Employee Updated");
          startApp();
          })

      })
};

const updateManagerID =()=>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message:"Enter employee ID" ,
              validate: employee_id => {
                 if (!isNaN(employee_id) === true ) {
                 return true;
                 }else {
                  console.log('Please enter a valid employee ID');
                  return false;
                  }}
     },
    { 
      type: 'input',
      name: 'newvalue',
      message:"Enter updated value" ,
                validate: newvalue => {
                if (!isNaN(newvalue) === true ) {
                  return true;
          
                }else {
                  console.log('Please enter a valid employee ID');
                  return false;
                }}
      },
   ]).then(updateStep =>{
           const sql = `update employee set manager_id = ${updateStep.newvalue} where id = ${updateStep.employee_id}`;

          db.query(sql,(err,rows) =>{
          if(err) console.log(err)
          console.table("Employee Updated");
          startApp();
          })

      })
};
  

const updateEmployee = async () => {
  inquirer.prompt([
      {
         type: 'list',
         name: 'updatefield',
         message:"Which field do you want to update: " ,
         choices: ['Fist Name',
                   'Last Name',
                   'Role ID',
                   'Manager ID'],
       }, 
       
     ])
     .then(nextStep => {
        switch (nextStep.updatefield) {
        
        case "Fist Name":
          updateFirst();
          break;

        case "Last Name":
          updateLast();
          break;
        
        case "Role ID":
          updateRoleID();
          break;
        
        case "Manager ID":
          updateManagerID();
          break;
          
          }
        })
      };
  
  

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first',
      message:"Enter employee First Name" ,
                validate: first => {
                  if (first) {
                    return true;
                  }else{
                    console.log('Please enter a valid name');
                    return false;
                  }
            },
     },
     {
      type: 'input',
      name: 'last',
      message:"Enter employee Last Name" ,
                validate: last => {
                  if (last) {
                    return true;
                  }else{
                    console.log('Please enter a valid name');
                    return false;
                  }
            },
     },


    { 
      type: 'list',
      name: 'roleId',
      message:"Select Role ID" ,
      choices:['Sales Manager','Sales Agent','Accountant','Finance Manager'],// add sql select
      },

      { 
        type: 'list',
        name: 'managerId',
        message:"Select Manager ID" ,
        choices:['Lola, Garcia','Tomas, Krol','Manager Position'],
        },

      ]).then(newEmployee =>{

    switch(newEmployee.roleId){
      case "Sales Manager":
        newEmployee.roleId =1;
        break;

      case "Sales Agent":
        newEmployee.roleId =2;
        break;

      
      case "Accountant":
        newEmployee.roleId =3;
        break;
      
      
      case "Finance Manager":
        newEmployee.roleId =4;
        break;

    }
    switch(newEmployee.managerId){
      case "Lola, Garcia":
        newEmployee.managerId =1;
        break;

      case "Tomas, Krol":
        newEmployee.managerId =3;
        break;

      
      case "Manager Position":
        newEmployee.managerId = null;
        break;
      
      
      // case "Finance Manager":
      //   roleId =4;
      //   break;

    }
      const sql = `INSERT INTO employee (first_name, last_name,role_id, manager_id)
                    VALUES ("${newEmployee.first}","${newEmployee.last}",${newEmployee.roleId},${newEmployee.managerId})`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table("Employee Created");
    startApp();
    })

})

};

// const updateEmployeeManager = () => {

// };

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
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message:"Enter New Role Title" ,
                validate: title => {
                  if (title) {
                    return true;
                  }else{
                    console.log('Please enter a valid title');
                    return false;
                  }
            },
     },
     {
      type: 'input',
      name: 'salary',
      message:"Enter Role Salary (only numbers)" ,
            validate: salary => {
              if (!isNaN(salary) === true ) {
                return true;
        
              }else {
                console.log('Please enter a valid salary');
                return false;
              }}
     },


    { 
      type: 'list',
      name: 'departmentId',
      message:"Select Department ID" ,
      choices:['Sales','Accounting','Operations','Support','Development'],// add sql select
      },

      
      ]).then(newRole=>{

    switch(newRole.departmentId){
      case "Sales":
        newRole.departmentId =1;
        break;

      case "Accounting":
        newRole.departmentId =2;
        break;

      
      case "Operations":
        newRole.departmentId =3;
        break;
      
      
      case "Support":
        newRole.departmentId =4;
        break;

      case "Development":
        newRole.departmentId =5;
        break;

    }
    const sql = `INSERT INTO role (title,salary,department_id)
                 VALUES ("${newRole.title}",${newRole.salary},${newRole.departmentId})`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table("Role Added");
    startApp();
    })

})


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



const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message:"Enter New Department Name" ,
                validate: name => {
                  if (name) {
                    return true;
                  }else{
                    console.log('Please enter a valid name');
                    return false;
                  }
            },
     },
    
      
      ]).then(newDepartment=>{

    const sql = `INSERT INTO department (name)
    VALUES ("${newDepartment.name}")`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table("Department Added");
    startApp();
    })

})


};

const budgetByDepartment = () => {
  const sql =  `SELECT d.name Department_Name, CONCAT('$', FORMAT(sum(r.salary), 2)) Total_Budget ,count(e.id) Total_Employees
                FROM department d,  role r, employee e
                WHERE d.id = r.department_id
                AND e.role_id = r.id
                group by d.id`;
  db.query(sql,(err,rows) => {
    if(err) console.log(err)
    console.table(rows);
  startApp();
  })
};



const deleteData = () => {
  inquirer.prompt([
     { 
      type: 'list',
      name: 'table',
      message:"Select which record would you like to delete" ,
      choices:['Employee','Role','Department'],
      },
      { 
        type: 'input',
        name: 'id',
        message:"Enter record ID" ,
                  validate: id => {
                  if (!isNaN(id) === true ) {
                    return true;
            
                  }else {
                    console.log('Please enter a valid ID');
                    return false;
                  }}
        },


      ]).then(deleteRecord =>{
  
    const sql = `DELETE FROM ${deleteRecord.table} WHERE id = ${deleteRecord.id};`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.log(deleteRecord.table, "Deleted");
    startApp();
    })

})

};



// The App
const startApp = () =>{
    inquirer.prompt([
      {
         type: 'list',
         name: 'start',
         message:"What would you like to do?" ,
         choices:['View all employees',
                  'View employees by Manager',
                  'View employees by Department',
                  'Add employee',
                  // 'Update employee role',
                  // 'Update employee manager',
                  'Update Employee',
                  'View all roles',
                  'Add new role',
                  'View all departments',
                  'Add new department',
                  'View total budget by department',
                  'Delete record',
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
        


// Update first, last, role or manager of an employee
        // case "Update employee role":
        //    updateEmployeeRole();
        //    break;

        // case "Update employee manager":
        //    updateEmployeeManager();
        //    break;
        case "Update Employee":
           updateEmployee();
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
        
        case "Delete record":
           deleteData();
           break;
      
    
        default:
           console.log('Bye Bye!!')
           process.exit();
        };
     })
 };

 startApp();
 

