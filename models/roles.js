
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

const Roles = sequelize.define("roles", {
    role_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type:Sequelize.STRING,  allowNull: false },
    salary: { type:Sequelize.INTEGER,  allowNull: false },
    department_id: { type:Sequelize.INTEGER,  allowNull: false },
},{
    // options
    timestamps: false
});

// Syncs with DB
Roles.sync();
module.exports = Roles;
