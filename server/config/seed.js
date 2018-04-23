/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../models/userSchema.js');
var role = require('../models/roles.js');
var constituency = require('../models/constituency.js');

/// Dummy data creation till screens are ready
var election = require('../models/election.js');
var nomination = require('../models/nomination.js');
var voting = require('../models/voting.js');


User.find({}).then(function(users) {
    if (users.length > 0) {
        // do not populate Again
        console.log('Users Already populated');
    } else {

		constituency.remove({}, function(err, removed) {
            console.log("Constituencies removed");
        });
		
			var constituency1 = new constituency(
			{constituencyId: 101, constituencyName: "East"});
			var constituency2 = new constituency(
			{constituencyId: 102, constituencyName: "West"});
			var constituency3 = new constituency(
			{constituencyId: 103, constituencyName: "SOUTH"});
			var constituency4 = new constituency(
			{constituencyId: 104, constituencyName: "North"});
			var constituency5 = new constituency(
			{constituencyId: 105, constituencyName: "Central"});
			var constituency6 = new constituency(
			{constituencyId: 106, constituencyName: "North East"});
			
		 constituency.create(
                constituency1,
				constituency2,
				constituency3,
				constituency4,
				constituency5,
				constituency6
            )
            .then(() => {
                console.log('finished populating constituencies');	
				 role.remove({}, function(err, removed) {
					console.log("Roles removed");
				});
		
        var citizen = new role({
            roleId: 10,
            roleName: "CITIZEN"
        });

        var electionCommission = new role({
            roleId: 20,
            roleName: "ELECTION_COMMISION"
        });

        var candidate = new role({
            roleId: 30,
            roleName: "NOMINEE"
        });

        var otherUser = new role({
            roleId: 40,
            roleName: "GUEST"
        });

        role.create(
                citizen,
                electionCommission,
                candidate,
                otherUser
            )
            .then(() => {
                console.log('finished populating roles');
				
            var citizen1 = new User({
            //provider: 'local',
                        //provider: 'local',
            role: citizen._id,
			firstname: 'user3',
			lastname: 'LN3',
            email: 'user3@email.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			//MaritalStatus: "Married",
			constituency: constituency1._id,
			//BackgroundVerification:''
        });
        var citizen2 = new User({
           //provider: 'local',
                        //provider: 'local',
            role: citizen._id,
			firstname: 'user1',
			lastname: 'LN1',
            email: 'user1@email.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			//MaritalStatus: "Married",
			constituency: constituency1._id,
			//BackgroundVerification:''
        });
		var citizen3 = new User({
           //provider: 'local',
                        //provider: 'local',
            role: citizen._id,
			firstname: 'user2',
			lastname: 'LN2',
            email: 'user2@email.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			//MaritalStatus: "Married",
			constituency: constituency1._id,
			//BackgroundVerification:''
        });
        var electionCommision1 = new User({
            //provider: 'local',
            role: citizen._id,
			firstname: 'Sai Krishna Kanth',
			lastname: 'Uppuluri',
            email: 'ukrishnakanth@email.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			//MaritalStatus: "Married",
			constituency: constituency1._id,
			//BackgroundVerification:''
        });

        var candidate1 = new User({
           //provider: 'local',
                        //provider: 'local',
            role: citizen._id,
			firstname: 'Elon',
			lastname: 'Musk',
            email: 'emusk@email.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			//MaritalStatus: "Married",
			constituency: constituency1._id,
			//BackgroundVerification:''
        });
		
		var candidate2 = new User({
            //provider: 'local',
                        //provider: 'local',
            role: citizen._id,
			firstname: 'Mark',
			lastname: 'Zuckerberg',
            email: 'markz@email.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			//MaritalStatus: "Married",
			constituency: constituency1._id,
			//BackgroundVerification:''
        });

         User.create(
                citizen1,
                citizen2,
                citizen3,
                electionCommision1,
                candidate1,
                candidate2

            ).then((res) => {
                console.log('finished populating users');
				
				/// Dummy record for Elections till screens are ready
					var election1 = new election({
						ElectionId: 1000,
						ElectionStatus: 0,
						ConstituencyId: constituency1._id,
						nominationDt: '',
						resultsDt: '',
						pollingDt: ''
					});
					 election.create(
						election1

					).then((res) => {
						console.log('finished populating election details');
							var nomination1 = new nomination({
								//provider: 'local',
								constituency: 
									constituency1._id
								,
								UserId: 
									candidate1._id
								,
								ElectionId : 
									election1._id
								,
								Party:'BJP',
								Symbol:'LOTUS',
								Status:'PENDING'
							});
							var nomination2 = new nomination({
								//provider: 'local',
								constituency: 
									constituency1._id
								,
								UserId: 
									candidate1._id
								,
								ElectionId : 
									election1._id
								,
								Party:'Janasena',
								Symbol:'Fist',
								Status:'PENDING'
							});
							 nomination.create(
								nomination1,
								nomination2
							).then((res) => {
								console.log('finished populating nomination details');
								
								
								var voting1 = new voting({
									provider: 'local',
									NominationId: [
										nomination1._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										citizen1._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting2 = new voting({
									provider: 'local',
									NominationId: [
										nomination1._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										citizen2._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting3 = new voting({
									provider: 'local',
									NominationId: [
										nomination2._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										citizen3._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting4 = new voting({
									provider: 'local',
									NominationId: [
										nomination2._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										candidate1._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting5 = new voting({
									provider: 'local',
									NominationId: [
										nomination2._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										candidate2._id
									],
									ElectionId : [
										election1._id
									],
								});
								 voting.create(
									voting1,
									voting2,
									voting3,
									voting4,
									voting5

								).then((res) => {
									console.log('finished populating voting details');
								});
							});
					});
				/// Dummy record for Elections till screens are ready
			
            });
     });
	 });
    }
});
