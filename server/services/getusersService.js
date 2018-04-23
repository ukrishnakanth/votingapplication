
/**
 *@author suppuluri@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var users = require('../models/getusers.js');
var roles = require('../models/roles.js')

/**
 * Get list of users
 * restriction: 'admin'
 */
// exports.getUsersInfo = function(req, res) {
//     // get a list of all users, create a promise,exc() with
//     // fullfilled function then() and rejected function catch()
//     // then can be multipe , catch just catches the erroors
//     return users.find({})
//         .then(users => {
//             console.log(users);
//             res.status(200).json(users);
//         })
//         .catch(err => next(err));
// }


exports.getUsersInfo = function(req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors
    // return users.find({})
    //     .then(users => {
    //         users.forEach(function(user){
    //             user.role.forEach(function(objID){

    //                 return roles.find({_id:objID})
    //                 .then(role => {
    //                     user.role = role;
    //                 });
    //             });
    //         });
    //         res.status(200).json(users);            
    //     })
    //     .catch(err => next(err));

        return users.find({})
        .populate('role')
        .exec((err, users) => {
            console.log(users);
            // roles.find({_id:'59f9e72addb3c471945632be'}).then(function(res){
            //     console.log(res);
            // });
            res.status(200).json(users);
        });
}


