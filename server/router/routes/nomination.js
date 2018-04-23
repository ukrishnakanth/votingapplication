/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var userService = require('../../services/userService');
var nominationServ = require('../../services/nominationService');
var fileNominations = require('../../services/fileNominationService');
var ctrlAuth = require('../../auth/authentication');
//router.get('/retreiveCandidateDets/:id', ctrlAuth.retreiveCandidateDets);
//TODO - Change this to GET
router.post('/retreiveCandidateDets/', userService.retreiveCandidateDets);
router.post('/register/', ctrlAuth.isAuthenticated(), nominationServ.registerCandidate);
router.get('/getAllCandidates', nominationServ.getAllCandidates);
router.get('/getallnominees', fileNominations.getAllNominees);
router.put('/approve', fileNominations.approveNomination);
router.put('/reject', fileNominations.rejectNomination);

module.exports = router;
