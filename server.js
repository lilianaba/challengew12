const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const e = require('express');
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

const viewEmployeesByManager = () => {
    const managersSelect = `SELECT concat( first_name,', ',last_name) Manager , id ID FROM employee where manager_id is null`;
    
    db2.query(managersSelect).then( ([rows])=>{
      const choices = rows.map(m=>m.Manager);
      const ids = rows.map(i=>i.ID);
      // console.log(choices);
      // console.log(ids);
      inquirer.prompt([
        {
           type: 'list',
           name: 'manager',
           message:"Select a manager: " ,
           choices: choices,
         },      
       ])
    // })
    
   .then(nextStep => {

    // console.log(nextStep.manager, choices.indexOf(nextStep.manager));
    
    const index =  ids[choices.indexOf(nextStep.manager)];
    // console.log("console log index: " , index);
    const sql =  `select e.id ID, e.first_name Fist_Name, e.last_name Last_Name, d.name Dept_Name, r.title Role, CONCAT('$', FORMAT(r.salary, 2)) Salary 
                  from employee e 
                  left join role  r
                    on r.id = e.role_id 
                  left join department d 
                    on d.id = r.department_id 
                  where e.manager_id = ${index}`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.log(nextStep.manager, "employes: ")
    console.table(rows);

    startApp();
    }) 

     })
    })
    };

const viewEmployeesByDepartment = () => {
  const departmentSelect = `SELECT name, id ID FROM department`;
    
  db2.query(departmentSelect).then( ([rows])=>{
    const choices = rows.map(d=>d.name);
    const ids = rows.map(i=>i.ID);
    inquirer.prompt([
      {
         type: 'list',
         name: 'department',
         message:"Select a department: " ,
         choices: choices,
       },      
     ])
  // })
  
 .then(nextStep => {

  // console.log(nextStep.manager, choices.indexOf(nextStep.manager));
  
  const index =  ids[choices.indexOf(nextStep.department)];
  // console.log("console log index: " , index);
  const sql =  `select e.id ID, e.first_name Fist_Name, e.last_name Last_Name, d.name Dept_Name, r.title Role, CONCAT('$', FORMAT(r.salary, 2)) Salary 
                from employee e 
                left join role  r
                  on r.id = e.role_id 
                left join department d 
                  on d.id = r.department_id 
                where d.id = ${index}`;

  db.query(sql,(err,rows) =>{
  if(err) console.log(err)
  console.log(nextStep.department, "employes: ")
  console.table(rows);

  startApp();
  }) 

   })
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

const addManager = () => {
  const roleSelect =`SELECT title, id ID FROM role`;

  db2.query(roleSelect).then( ([rowsd])=>{
    const roles = rowsd.map(r=>r.title);
    const ids_r= rowsd.map(i=>i.ID);

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
      choices:roles,
      },

      ]).then(newEmployee =>{
      const index_r =  ids_r[roles.indexOf(newEmployee.roleId)];

      const sql = `INSERT INTO employee (first_name, last_name,role_id, manager_id)
                    VALUES ("${newEmployee.first}","${newEmployee.last}",${index_r},NULL)`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table("Manager Created");
    startApp();
    })

})
  })

}

const addEmployee = () => {
  const managersSelect = `SELECT concat( first_name,', ',last_name) Manager , id ID FROM employee where manager_id is null`;
  const roleSelect =`SELECT title, id ID FROM role`;

  db2.query(roleSelect).then( ([rowsr])=>{
    // const departments = rows.map(m=>m.Manager);
    // const ids_d = rows.map(i=>i.ID);

  db2.query(managersSelect).then( ([rowsm])=>{
    const roles = rowsr.map(r=>r.title);
    const ids_r = rowsr.map(i=>i.ID);
    const managers = rowsm.map(m=>m.Manager);
    const ids_m = rowsm.map(i=>i.ID);


  
  

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
      choices:roles,
      },

      { 
        type: 'list',
        name: 'managerId',
        message:"Select Manager ID" ,
        choices:managers,
        },

      ]).then(newEmployee =>{

    

    const index_m =  ids_m[managers.indexOf(newEmployee.managerId)];
    const index_r =  ids_r[roles.indexOf(newEmployee.roleId)];

    const sql = `INSERT INTO employee (first_name, last_name,role_id, manager_id)
                  VALUES ("${newEmployee.first}","${newEmployee.last}",${index_r},${index_m})`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table("Employee Created");
    startApp();
    })

})
  })

});
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
const departmentSelect =`SELECT name, id ID FROM department`;

db2.query(departmentSelect).then( ([rows])=>{
  const departments = rows.map(d=>d.name);
  const ids = rows.map(i=>i.ID);

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
      choices:departments,
      },

      
      ]).then(newRole=>{

    const index =  ids[departments.indexOf(newRole.departmentId)];
    const sql = `INSERT INTO role (title,salary,department_id)
                 VALUES ("${newRole.title}",${newRole.salary},${index})`;

    db.query(sql,(err,rows) =>{
    if(err) console.log(err)
    console.table("Role Added");
    startApp();
    })

})


});
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
                  'Add manager',
                  'Add employee',
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

        case "Add manager":
          addManager();
          break;
 
        case "Add employee":
           addEmployee();
           break;
        
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
 

