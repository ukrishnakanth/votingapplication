/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/authentication');

var electionService = require('../../services/electionService');
router.get('/elections', auth.isAuthenticated(), electionService.getElectionInfo);
router.post('/elections', electionService.createElectionInfo);
router.put('/elections', electionService.startElection)

module.exports = router;


//router.get('/details',auth.isAuthenticated() ,homeSrv.getAll); 