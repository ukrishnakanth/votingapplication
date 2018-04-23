/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/authentication');

var ballotBoxService = require('../../services/ballotService.js');
router.get('/ballot', auth.isAuthenticated(), ballotBoxService.getBallotInfo);
router.post('/ballot', auth.isAuthenticated(), ballotBoxService.postBallotInfo);
module.exports = router;
