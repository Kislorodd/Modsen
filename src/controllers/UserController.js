const userService = require('../services/UserService');
const UserConfig = require('../config/ModelsConfig.json');


class UserController {
    async GetAll(req, res) {
        res.send(await userService.GetAll());
    }

    async GetCurrentUser(req, res) {
        res.send(await userService.GetDetailById(req.user.id));
    }

    async UpdateCurrentUser(req, res) {
        let userId = req.user.id;

        let user = {
            login: req.body.login,
            password: req.body.password
        };

    

        res.send(await userService.EditCurrentUser(userId, user));
    }

    async GetById(req, res) {
        res.send(await userService.GetDetailById(req.params.id))
    }

    async EditById(req, res) {
        let userId = req.params.id;

        let user = {
            login: req.body.login,
            password: req.body.password
        };


        res.send(await userService.EditById(userId, user));
    }

    async DeleteById(req, res) {
        await userService.DeleteById(req.params.id);
        res.send('Ok');
    }

    async Register(req, res) {
        let user = {
            login: req.body.login,
            password: req.body.password
        };


        res.send(await userService.Register(user))
    }

    async Login(req, res) {
        let user = {
            login: req.body.login,
            password: req.body.password
        }

        res.send(await userService.Login(user));
    }

}

module.exports = new UserController();
