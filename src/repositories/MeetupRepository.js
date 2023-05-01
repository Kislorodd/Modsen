const sequelize = require('sequelize');
const Meetup = require('../models/Meetup');

class MeetupRepository {
    async GetAll() {
        return await Meetup.findAll();
    }

    async GetById(meetupId) {
        return await Meetup.findOne({
            where: {
                id: meetupId
            }
        })
    }

    async Create(meetup) {
        return Meetup.create(meetup)
    }

    async EditById(meetupId, meetup) {
        await Meetup.update(meetup, {
            where: {
                id: meetupId
            }
        });

        return await this.GetById(meetupId);
    }

    async DeleteById(meetupId) {
        await sequelize.models.movie.destroy({
            where: {
                id: meetupId
            }
        });
    }

    async IncreaseSeatById(meetupId, inc = 1) {
        await Meetup.update(
            { placeCount: sequelize.literal(`place_count + ${inc}`) },
            { where: { id: meetupId }}
        );
    }

    async DecreaseSeatById(meetupId, dec = 1) {
        await Meetup.update(
            { placeCount: sequelize.literal(`place_count - ${dec}`) },
            { where: { id: meetupId }}
        );
    }
}

module.exports = new MeetupRepository();
