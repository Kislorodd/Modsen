const Sequelize = require('sequelize');
const sequelize = require('../config/DatabaseConfig');

const Meetup = sequelize.define('meetup', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        field: 'id'
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        field: 'descr'
    },
    tags: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        field: 'tags'
    },
    time: {
        type: Date,
        allowNull: false,
        unique: true,
        field: 'time'
    },

},
{
    timestamps: false
});

module.exports = Meetup;
