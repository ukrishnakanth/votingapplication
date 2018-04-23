/**
 *@author hitjoshi@deloitte.com
 * All routes are defined here
 * For further drill down go to respective files
 */

var express = require('express');
var router = express.Router();

// router.use('/api', function (req, res, next) {
//     console.log('calling routes', req.user, req.session.user);
//     //console.log(req.session.passport);
//     next();
// });


// router.use('/api/user', function (req, res, next) {
//     res.locals.userdata = req.email;
//     next();
// });


router.use('/api', require('./routes/election'));
router.use('/api', require('./routes/ballotBox'));
router.use('/api', require('./routes/getUsers'));
router.use('/api/user', require('./routes/user'));
router.use('/api/dashboard', require('./routes/dashboard'));
router.use('/api/nominations', require('./routes/nomination'));
// router.use('/api/election', require('./routes/election'));
//router.use('/api/ballotBox', require('./routes/ballotBox'));
router.use('/api/voting', require('./routes/castVoting'));
router.use('/api/constituency', require('./routes/constituency'));
// router.use('/home', require('./routes/home'));
module.exports = router


