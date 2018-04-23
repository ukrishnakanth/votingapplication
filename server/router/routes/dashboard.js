/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var ctrlAuth = require('../../auth/authentication');
var dashboardService = require('../../services/dashboardService');
router.get('/votingResults', dashboardService.getVotingResult);
router.get('/getelections', ctrlAuth.isAuthenticated(), dashboardService.getCompletedElections);
router.get('/getballots', dashboardService.getresults);

module.exports = router;
