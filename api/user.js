var mongo = require('mongoose');
var jwt = require('jwt-simple');
var secret = 'xxx';
var logger = require('morgan');

var User = require('../model/user.js');

/**
 * This method is called on register route: /users/register
 * @param {Object} req Takes the request object
 * @param {Object} res Takes response object
 */

exports.registerUser = function(req, res) {
	var user = new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password}).save().then((data) => {
		res.setHeader('Content-Type', 'application/json');
		//TODO: send mail
		console.log(data);
		res.send({message: "A verification mail has been sent to your registered mail."});
		logger.info('A verification mail has been sent to '+data.username);
	}).catch((e)=> {
		logger.error('Something went wrong at registerUser');
		res.status(500).send({type: 'Error', message: 'Something went wrong.'});
	});
};

/**
 * This method is called on login route: /users/login
 * @param {Object} req  Takes the request object
 * @param {Object} res  Takes response object
 */

exports.loginUser = function(req, res) {
	User.findOne({username: req.body.username, password: req.body.password}).then((user)=> {
		console.log(user);
		if(!user) {//if empty user then return invaid.
			res.status(404).send({message:'invalid inputs'}).end();
			return;
		}
		var payload = {username: user.username};
		var token = jwt.encode(payload, secret);
		var resObj = {
			token,
			user
		};
		res.send(resObj);
		logger.info('loggin request from ' + user.username);
	}).catch((e)=> {
		logger.error('Something went wrong at loginUser');
		res.status(500).send({type: 'Error', message: 'Something went wrong.'});
	});
};

//validate done
//use promise done
//testing 
//logging done
//