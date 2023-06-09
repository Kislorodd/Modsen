const sequelize = require('../config/DatabaseConfig');
const User = require('../models/User');
const Op = require('sequelize').Op;


class UserRepository {
    async GetAll() {
        return await User.findAll();
    }

    async GetById(userId) {
        return await User.findOne({
            where: {
                id: userId
            }
        })

    }


    async Create(user, role) {
        return await sequelize.transaction(
            async (t) => {
                user = await User.create(user, { transaction: t });
                await user.addRole(role, {transaction: t});

                return user;
            }
        )
    }

    async EditById(userId, user) {
        return await User.update(user, {
            where: {
                id: userId
            }
        });
    }

    async DeleteById(userId) {
        await User.destroy({
            where: {
                id: userId
            }
        })
    }
}

module.exports = new UserRepository();