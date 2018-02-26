var User = require('../models/user.model.js');

exports.create = function(req, res) {
	// Create and Save a new User
	console.log(req.body);
    if(!req.body.userId) {
        return res.status(400).send({message: "User can not be empty"});
    }

    var user = new User({
    	userId: req.body.userId || "Untitled User",
        name: req.body.name,
        password: req.body.password,
        active: req.body.active
    	});

    user.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error ocuured while creating the User."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all users from the database.
    User.find(function(err, users){
        if(err) {
            res.status(500).send({message: "Some error ocuured while retrieving users."});
        } else {
            res.send(users);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single user with a userId
	console.log(req.params.userId);
    User.findById(req.params.userId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve user with id " + req.params.userId});
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a user identified by the noteId in the request
    User.findById(req.params.userId, function(err, user) {
        if(err) {
            return res.status(500).send({message: "Could not find a user with id " + req.params.userId});
        }
       
        user.userId= req.body.userId;
        user.name= req.body.name;
        user.password= req.body.password;
        user.active= req.body.active;
        
        user.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update user with id " + req.params.userId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a user with the specified noteId in the request
    User.remove({_id: req.params.userId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete user with id " + req.params.userId});
        } else {
            res.send({message: "User deleted successfully!"})
        }
    });
};