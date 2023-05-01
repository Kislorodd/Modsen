const meetupRepository = require('../repositories/MeetupRepository');

class MeetupService {
    async GetAll() {
        return await meetupRepository.GetAll();
    }

    async GetById(meetupId) {
        return await meetupRepository.GetById(meetupId);
    }

    async CreateOne(meetup) {
        return await meetupRepository.Create(meetup);
    }

    async EditById(meetupId, meetup) {
        return await meetupRepository.EditById(meetupId, meetup);
    }

    async DeleteById(meetupId) {
        return await meetupRepository.DeleteById(meetupId);
    }
}

module.exports = new MeetupService();