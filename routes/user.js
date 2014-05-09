
/*
 * GET users listing.
 */

var mongoose = require('mongoose');

var users_old = [
    { 
	name: 'Daniel',
	age: '25'
    },
    {
	name: 'Sara',
	age: '26'
    }
];


 mongoose.model('users', {name : String});

exports.list = function(req, res){
    mongoose.model('users').find(function(err, users){
	res.send(users);
    });
};
