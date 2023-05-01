// ErrorHandler

const express = require('express');
const router = express.Router();


const userRouter = require('../routers/UserRoute');
const roleRouter = require('../routers/RoleRoute');
const meetupRouter = require('../routers/MeetupRoute');


router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/meetups', meetupRouter);


module.exports = router;
