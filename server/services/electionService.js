
/**
 *@author mbharti@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var elections = require('../models/election.js');

/**
 * Get list of elections
 * restriction: 'admin'
 */
exports.getElectionInfo = function (req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors
    console.log('Elections Infor --------->', req.user.constituency);
    return elections.find({ ConstituencyId: req.user.constituency }).populate('ConstituencyId')
        .then(users => {
            console.log(users)
            res.status(200).json(users);
        })
        .catch(err => next(err));
}

exports.startElection = function (req, res) {
    if (req.body.ElectionStatus == 0) {
        return elections.update({ ElectionId: req.body.ElectionId }, { $set: { ElectionStatus: 1 } })
            .then(data => {
                res.status(200).json(data);
            })

    } else if (req.body.ElectionStatus == 1) {
        return elections.update({ ElectionId: req.body.ElectionId }, { $set: { ElectionStatus: 2 } })
            .then(data => {
                res.status(200).json(data);
            })

    } else if (req.body.ElectionStatus == 2) {
        return elections.update({ ElectionId: req.body.ElectionId }, { $set: { ElectionStatus: 3 } })
            .then(data => {
                res.status(200).json(data);
            })

    }

}

exports.createElectionInfo = function (req, res) {
    var elecObj = req.body;
    console.log(elecObj);
    return elections.find({}).sort({ "ElectionId": -1 }).limit(1)
        .then(eid => {
            elecObj.ElectionId = eid[0].ElectionId + 1;
            console.log(elecObj);
            elections.insertMany(elecObj)
                .then(users => {
                    console.log(elecObj);
                    console.log(users);
                    res.status(200).json(users);
                });
        });
}


