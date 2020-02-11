
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

const Departments = sequelize.define("departments", {
        department_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type:Sequelize.STRING,  allowNull: false },
    },
    {
        // options
        timestamps: false
    }
);

// Syncs with DB
Departments.sync();
module.exports = Departments;
