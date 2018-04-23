
/**
 *@author mbharti@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var constituency = require('../models/constituency.js');
var election = require('../models/election.js');
var nominations = require('../models/nomination.js');
var User = require('../models/userSchema.js');


exports.getAllNominees = function (req, res) {
    nominations.find({}).populate('constituency').populate('ElectionId').populate('UserId')
        .then(nom => {
            console.log(nom);
            res.status(200).json(nom);
        })

    // User.findOne({
    //     _id: paramUserId
    // }).then(function (user) {
    //     console.log(user);
    //     nominations.aggregate([
    //         { $match: { Status: "ACCEPTED", constituency: user.constituency } },
    //         { $lookup: { from: "users", localField: "UserId", foreignField: "_id", as: "userData" } }, { $unwind: "$userData" },
    //         { $lookup: { from: "elections", localField: "ElectionId", foreignField: "_id", as: "electionDetails" } }, { $unwind: "$electionDetails" },
    //         { $match: { userData: { $ne: [] }, electionDetails: { $ne: [] }, 'electionDetails.ElectionDate': { '$lt': dateMidnight, '$gt': startDate } } }
    //     ]).exec().then((candidates) => {
    //         console.log(candidates);
    //         return res.json({ candidates })
    //     }
    //     )
    // })




}

/**
 * register Nomination for an election
 */
exports.registerNominee = function (req, res) {

    var nomination1 = new Nominations({
        Party: req.body.party,
        Symbol: req.body.symbol,
        Status: 'ACCEPTED',
        constituency: req.body.selectedConstituency,
        ElectionId: req.body.selectedElection,
        UserId: req.body._id
    });
    console.log('Object created');
    nomination1.save()
        .then(function (savedUser) {
            console.log('finished creating nomination');
            return res.status(200);
        })
        .catch(function (err) {
            console.log(err);
            console.log('error occurred');
        });
}


//Approve a nomination

exports.approveNomination = function (req, res) {

    return nominations.update({ NominationId: req.body.NominationId }, { $set: { Status: "Approved" } })
        .then(data => {
            res.status(200).json(data);
        })

}

//Reject a nomination

exports.rejectNomination = function (req, res) {

    return nominations.update({ NominationId: req.body.NominationId }, { $set: { Status: "Rejected" } })
        .then(data => {
            res.status(200).json(data);
        })

}
