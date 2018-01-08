var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var UserSchema = mongoose.Schema({
    userId: String,
    name: String,
    password: String,
    active: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);