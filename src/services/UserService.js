// Repositories //
const userRepository = require('../repositories/UserRepository');
const roleRepository = require('../repositories/RoleRepository');
// Password Encryption //
const crypt = require("../utils/Crypt");
const jwt = require('jwt-simple');
// Configs //
const UserConfig = require('../config/ModelsConfig.json');
const AuthConfig = require('../config/AuthConfig.json');
// errors //
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
// Mailer //
const Mailer = require('../utils/Mailer');
const fs = require("fs");
const path = require("path");

class UserService {
    async GetAll() {
        return await userRepository.GetAll();
    }

    async GetDetailById(userId) {
        let user = await userRepository.GetById(userId);

        if (!user) {
            throw new NotFoundError("No such user");
        }

        let userInfo = await userInfoRepository.GetByUserId(userId);
        userInfo.userId = undefined; // Hide redundant parameter

        return {...user.get(), ...userInfo.get()};
    }

    async Register(user) {
        let role = await roleRepository.GetById(UserConfig.Users.DefaultRole);
        if (role === null) {
            throw new Error("Role not found");
        }

        // Hashing the password
        user.password = await crypt.CryptPassword(user.password);

        user = await userRepository.Create(user, role, userInfo);

        let mail = {
            to: userInfo.email,
            subject: 'Welcome to meetups app',
            text: 'Thank you for registering at our app',
            html: '<b>You are welcome!</b>'
        }

        await Mailer(JSON.stringify(mail));

        return user;
    }

    async Login(user) {
        const password = user.password;
        user = await userRepository.GetOneByQuery({login: user.login});

        if (!user) {
            throw new NotFoundError('No such user');
        }

        if (!crypt.ValidatePassword(password, user.password)) {
            throw new UnauthorizedError('Bad password') // 401 : RFC 7235
        }

        let token = this.GenerateToken(user.id)

        return await this.GetCurrentUser(user.id, token);
    }

    async EditById(userId, user) {
        if (user) {
            // If password is not null, then it is supposed that we want to change it
            if (user.password) {
                user.password = await crypt.CryptPassword(user.password);
            }
            await userRepository.EditById(userId, user);
        }


        return await userRepository.GetDetailById(userId);
    }

    async EditCurrentUser(userId, user) {
        if (user) {
            // If password is not null, then it is supposed that we want to change it
            if (user.password) {
                user.password = await crypt.CryptPassword(user.password);
            }
            await userRepository.EditById(userId, user);
        }

        let token = this.GenerateToken(userId)

        return await this.GetCurrentUser(userId, token);
    }

    async DeleteById(userId) {
        await userRepository.DeleteById(userId);
    }

    GenerateToken(userId) {
        let payload = {
            userId: userId,
        }

        let token = jwt.encode(payload, AuthConfig.SecretKey);

        return token;
    }

    async GetCurrentUser(userId, token) {
        let detailUser = await userRepository.GetDetailById(userId);
        detailUser = detailUser.get();
        detailUser.token = token;

        return detailUser;
    }   


}

module.exports = new UserService();
