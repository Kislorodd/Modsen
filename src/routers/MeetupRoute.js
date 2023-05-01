const express = require('express');
const router = express.Router();

const validate = require('../middleware/Validate');
const hallScheme = require('../schemes/MeetupScheme');

const isAuthorize = require('../middleware/IsAuthorize');

const hallController = require('../controllers/MeetupController');

router.get('/', hallController.GetAll
    /*
    #swagger.tags = ['Meetups']
    #swagger.security = [{ "bearerAuth": [] }]
    */);
router.get('/:id', hallController.GetById
    /*
    #swagger.tags = ['Meetups']
    #swagger.security = [{ "bearerAuth": [] }]
    */);
router.use(isAuthorize);
router.post('/', validate(hallScheme.create), hallController.CreateOne
    /*
    #swagger.tags = ['Meetups']
    #swagger.security = [{ "bearerAuth": [] }]
    */);
router.patch('/:id', validate(hallScheme.edit), hallController.EditById
    /*
    #swagger.tags = ['Meetups']
    #swagger.security = [{ "bearerAuth": [] }]
    */);
router.delete('/:id', hallController.DeleteById
    /*
    #swagger.tags = ['Meetups']
    #swagger.security = [{ "bearerAuth": [] }]
    */);

module.exports = router;
