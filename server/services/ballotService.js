
/**
 *@author suppuluri@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var ballot = require('../models/ballot.js');
var nominations = require('../models/nomination')

/**
 * Get list of elections
 * restriction: 'admin'
 */
// exports.getBallotInfo = function (req, res) {
//     // get a list of all users, create a promise,exc() with
//     // fullfilled function then() and rejected function catch()
//     // then can be multipe , catch just catches the erroors
//     console.log(req.params.ElectionId);
//     return nominations.find({}).exec()
//         .then(users => {
//             //console.log(users);
//             res.status(200).json(users);
//         })
//         .catch(err => next(err));
// }

exports.postBallotInfo = function (req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors

    // ballot.insertOne().exec()
    console.log(req.user);
    req.body.VoterID = req.user.email;
    console.log(req.body);


    return ballot.insertMany([req.body])
        .then(() => {
            console.log(req.body);
            res.status(200);
        })
        .catch(err => { console.log(err); });
}

exports.getBallotInfo = function (req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors
    //console.log(req.body, req.query)
    return nominations.find({ ElectionId: req.query.ElectionId }).populate('ElectionId').populate('constituency').populate('UserId')
        .exec()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        })
        .catch(err => next(err));
}

