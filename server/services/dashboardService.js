'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/userSchema.js');
var Roles = require('../models/roles.js');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var config = getConf('./env.js').get(process.env.NODE_ENV);
var Voting = require('../models/voting.js');
var elections = require('../models/election.js');
var ballot = require('../models/ballot.js');

module.exports.getVotingResult = function (req, res) {
  console.log('test dashboard');
  Voting.aggregate([
    { $group: { _id: { NominationId: "$NominationId", constituency: "$constituency", ElectionId: "$ElectionId" }, count: { $sum: 1 } } },
    { $lookup: { from: "nominations", localField: "_id.NominationId", foreignField: "_id", as: "nomiDetails" } }, { $unwind: "$nomiDetails" },
    { $lookup: { from: "users", localField: "nomiDetails.UserId", foreignField: "_id", as: "details" } }, { $unwind: "$details" },
    { $lookup: { from: "constituencies", localField: "_id.constituency", foreignField: "_id", as: "Area" } }, { $unwind: "$Area" },
    { $lookup: { from: "elections", localField: "_id.ElectionId", foreignField: "_id", as: "electionDetails" } }, { $unwind: "$electionDetails" },
    {
      $match: {
        details: { $ne: [] }, Area: { $ne: [] }, electionDetails: { $ne: {} }
        , 'electionDetails.ResultDate': { '$lt': new Date() }
      }
    },
    { $project: { "_id": 1, "count": 1, "Name": "$details.name", "Constitency": "$Area.constituencyName" } }
  ]).exec().then((votings) => {
    console.log("==========================");
    console.log(votings);
    return res.json({ votings })
  }
  )
};


module.exports.getCompletedElections = function (req, res) {
  console.log("---> get completed", req.user);
  return elections.find({ 'ConstituencyId': req.user.constituency, 'ElectionStatus': 3 }).populate('ConstituencyId')
    .then(users => {
      console.log(users)
      res.status(200).json(users);
    })
    .catch(err => next(err));

}

module.exports.getresults = function (req, res) {
  console.log("---------------> getResults", req.query.ElectionID);
  ballot.aggregate(
    [
      { "$match": { ElectionID: mongoose.Types.ObjectId(req.query.ElectionID) } },
      { "$group": { _id: "$Party", count: { $sum: 1 } } }

    ]
  ).exec().then((votes) => {
    console.log(votes);
    res.status(200).json(votes);
  })
    .catch(err => console.log(err));

}

// module.exports.getresults = function (req, res) {
//   console.log("---------------> getResults", req.query.ElectionID);
//   ballot.aggregate(
//     [
//       { "$match": { Constituency: mongoose.Types.ObjectId('5a1beef70dac2ba19cc54411') } }

//     ]).exec().then((votes) => {
//       console.log(votes);
//       res.status(200).json(votes);
//     })
//     .catch(err => console.log(err));

// }