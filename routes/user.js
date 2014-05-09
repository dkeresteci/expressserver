
/*
 * GET users listing.
 */

var users = [
    { 
	name: 'Daniel',
	age: '25'
    },
    {
	name: 'Sara',
	age: '26'
    }
]


exports.list = function(req, res){
  res.send(users);
};
