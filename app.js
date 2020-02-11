const cTable = require("console.table");
const inquirer = require("inquirer")
const sequelize = require("./config/connection")
// -- Models 
const Employees = require("./models/employees.js");
const Roles = require("./models/roles.js");
const Departments = require("./models/departments.js");
const tables = {
    Employees,
    Roles,
    Departments
}
async function mainPrompt(){
    await sequelize.sync()
    const joinedData = await sequelize.query(`SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, employees.role_id, roles.title AS role_title, roles.salary, departments.name AS department_title FROM employees, roles, departments WHERE roles.role_id = employees.role_id AND roles.department_id = departments.department_id ORDER BY employees.employee_id`, {type: sequelize.QueryTypes.SELECT})
    const joinedDataTable = cTable.getTable(joinedData)
    console.log(joinedDataTable)

    const view = "View a table";
    const add = "Add to a table";
    const update = "Update Employee Role";
    const exit = "Exit app";
    
    const userSelection =  await inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [view, add, update, exit]
        });

    switch(userSelection.option){
        case view: 
            viewTable()
            break
        case add:
            addData()
            break
        case update:
            updateData()
            break
        case exit:
            return;
    }
}
mainPrompt();

async function viewTable(table){
   let tableSelected = "";
    if(table){
        tableSelected = table;
    }
   else { answer =  await inquirer
        .prompt({
            type: "list",
            name: "tableSelected",
            message: "What would you like to view?",
            choices: ["Employees", "Roles", "Departments"]
        });

        tableSelected = answer.tableSelected;
        
    }
        
    
    const foundData = await tables[tableSelected].findAll({ raw: true })
    displayData(foundData)
}
async function addData(){
    const tableQuestions = {
        Employees: [
            {
                type: "input",
                name: "first_name",
                message: "What is the Employees First Name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the Employees Last Name?" 
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the Employees Role Id?"
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the Employees Manager Id?"
            }
        ],
        Roles: [
            {
                type: "input",
                name: "title",
                message: "What is the title of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?",
                filter: function(input){
                    return parseInt(input)
                }
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the department id for this role?",
                filter: function(input){
                    return parseInt(input)
                }
            }
        ],
        Departments: [
            {
                type: "input",
                name: "title",
                message: "What is the title of the department?"
            }
        ]
    }
    // Prompts the user to figure out what table they want to add data to
    const tableSelected =  await inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "What table would you like to add to?",
            choices: ["Employees", "Roles", "Departments"]
        })
    const rowValues = await inquirer
        .prompt(
            tableQuestions[tableSelected.option]
        )
    const result = await tables[tableSelected.option].create(rowValues)
    mainPrompt();

}

async function updateData(){
    
    // Get list of employees
    const usersList = await Employees.findAll(
        {   
            attributes: ["employee_id", "first_name", "last_name"],
            raw: true
        })
    
    const usersListString = [];
    
    for(let i = 0; i < usersList.length; i++){
        const {employee_id, first_name, last_name} = usersList[i];
        const employeeInfo = `${employee_id} ${first_name} ${last_name}`;
        usersListString.push(employeeInfo)
    }

    // Ask user what employee they would like to update
    const employeeToUpdate = await inquirer
        .prompt({
            type: "list",
            name: "selected",
            message: "Please select the employee who you want to update.",
            choices: usersListString
        })
    const indexOfSelected = usersListString.indexOf(employeeToUpdate.selected)
    const newRole = await inquirer
        .prompt({
            type: "input",
            name: "role_id",
            message: `What is ${employeeToUpdate.selected}'s new role id?`
        })
    
    Employees.update(
        {
            role_id: newRole.role_id,
        }, 
        {
            where: {employee_id : usersList[indexOfSelected].employee_id}
        });
      console.log(`${employeeToUpdate.selected} role updated!`)
      mainPrompt()

}

function displayData(dataToDisplay){
    
    const formattedData = cTable.getTable(dataToDisplay);
    console.log(formattedData);
    mainPrompt();
}