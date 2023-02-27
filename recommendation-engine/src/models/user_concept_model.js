const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserConceptSchema = new Schema({}, { strict: false, timestamps: true, collection: 'user_concepts' });
const UserConcept = mongoose.model('UserConcept', UserConceptSchema);

module.exports = { UserConcept };