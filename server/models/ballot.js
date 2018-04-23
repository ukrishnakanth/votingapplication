
/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ballotSchema = new Schema({
	ElectionID: {
		type: Schema.Types.ObjectId,
		ref: 'elections',
		required: true
	},
	VoterID: {
		type: String,
		ref: 'users',
		required: true
	},
	Constituency: {
		type: Schema.Types.ObjectId,
		ref: 'constituencies',
		required: true
	},
	Candidate: {
		type: Schema.Types.ObjectId,
		ref: 'nomination_details',
		required: true
	},
	Party: {
		type: String,
		required: true
	},
	pollDate: {
		type: Date, default: Date.now
	}

}, { collection: 'ballot' }, { versionKey: false });


module.exports = mongoose.model('ballot', ballotSchema);
