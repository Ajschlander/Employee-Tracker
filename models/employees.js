
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection");
const Roles = require("./roles");
const Departments = require("./departments");

// Creates an "Employees" model that matches up with DB
const Employees = sequelize.define("employees", {
    employee_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type:Sequelize.STRING,  allowNull: false },
    last_name: { type:Sequelize.STRING,  allowNull: false },
    role_id: { type:Sequelize.INTEGER,  allowNull: false },
    manager_id: { type:Sequelize.INTEGER,  allowNull: true }
}, 
{
    // options
    timestamps: false,
    underscored: true
}
);

// Syncs with DB
Employees.sync();

module.exports = Employees;
