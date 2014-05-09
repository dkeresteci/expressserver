/*                                                                                                            
 * GET items listing.                                                                                         
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    id: Schema.ObjectId,
    id_num: Number,
    title: String,
    date: Date, 
    location: String ,
    geolocation: String,
    description: String
    
});

 mongoose.model('items', itemSchema);

exports.list = function(req, res){
    mongoose.model('items').find(function(err, items){
        res.send(items);
    });
};
