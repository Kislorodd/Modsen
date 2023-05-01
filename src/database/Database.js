// Connect to database
const sequelize = require('../config/DatabaseConfig');

// Loading Models //
const user       = require('../models/User');
const role       = require('../models/Role');
const userRole   = require('../models/UserRole');
const meetup       = require('../models/Meetup');


// Users roles 
user.belongsToMany(role, { through: 'users_roles' });
role.belongsToMany(user, { through: 'users_roles' });

// meetup
meetup.belongsTo(user);
user.hasMany(meetup);


sequelize.sync().then(result => {
    // console.log(result);
}).catch(err => console.log(err));

sequelize.authenticate()
    .then(() => console.log('Successful connection to the database'))
    .catch(e => console.log('Failed connection to the database. Exception: ' + e));

module.exports = sequelize;
