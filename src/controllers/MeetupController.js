const meetupService = require('../services/MeetupService');

class MeetupController {
    async GetAll(req, res) {
        res.send(await meetupService.GetAll());
    }

    async GetById(req, res) {
        res.send(await meetupService.GetById(req.params.id))
    }

    async CreateOne(req, res) {
        let meetup = {
            name: req.body.name,
            rows: req.body.rows,
            seats: req.body.seats
        };

        res.send(await meetupService.CreateOne(meetup));
    }

    async EditById(req, res) {
        let meetup = {
            name: req.body.name,
            rows: req.body.rows,
            seats: req.body.seats
        };

        res.send(await meetupService.EditById(req.params.id, meetup));
    }

    async DeleteById(req, res) {
        await meetupService.DeleteById(req.params.id);
        res.send('Ok');
    }
}

module.exports = new MeetupController();
