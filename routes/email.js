
/*
 * GET users listing.
 */
var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport("direct", {debug : true});


var reply  = "Thanks for the message"; 
 
var callback_trans =  function(error, response){
    if(error){
        console.log(error);
        return;
    }

    // response.statusHandler only applies to 'direct' transport
    response.statusHandler.once("failed", function(data){
        console.log(
          "Permanently failed delivering message to %s with the following response: %s",
          data.domain, data.response);
     });

    response.statusHandler.once("requeue", function(data){
        console.log("Temporarily failed delivering message to %s", data.domain);
     });

    response.statusHandler.once("sent", function(data){
        console.log("Message was accepted by %s", data.domain);
     });
   };
 
exports.reply  = function(req, res){
    var mailOptions = {
    from: "me@tr.ee",
    to: "dkeresteci@gmail.com",
    subject: "Hello world! from AWD",
    text: "Plaintext body, from AWS"
    };

    transport.sendMail(mailOptions, callback_trans);
    res.send(reply);
   };

exports.send = function(req, res){
    var mailOptions = {
    from: req.body.email,
    to: "dkeresteci@gmail.com",
    subject: "New Message from " + req.body.name +  " on your Personal Page",
    text: req.body.message
    };

    transport.sendMail(mailOptions, callback_trans);    

    console.log("Req: " + req.body.name + " " + req.body.email );
    res.send("OK");
};
