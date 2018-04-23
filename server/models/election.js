
/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constituencies = require('./constituency.js');

var abc = new Schema({
	ElectionId: { type: Number, default: 999 },
	ElectionStatus: { type: Number, default: 0 },
	ConstituencyId: { type: Schema.Types.ObjectId, ref: 'constituencies' },
	nominationDt: { type: Date },
	resultsDt: { type: Date },
	pollingDt: { type: Date }
});


module.exports = mongoose.model('elections', abc);
