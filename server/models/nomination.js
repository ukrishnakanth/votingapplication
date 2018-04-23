
/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constituencies = require('./constituency.js');
var userSchema = require('./userSchema.js');
var election = require('./election.js');

var nominations = new Schema({
	//NominationId:{type: Number, required: true},
	UserId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	ElectionId: {
		type: Schema.Types.ObjectId,
		ref: 'elections'
	},
	constituency: {
		type: Schema.Types.ObjectId,
		ref: 'constituencies'
	},
	Party: { type: String, required: false },
	NominationId: { type: Number, required: false },
	Symbol: { type: String, required: true },
	Status: { type: String, required: false },
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('nomination_details', nominations);
