// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Load require modules
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function(clientId, secret, callback) {
    Client.findOne({ clientId: clientId }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client) { return callback(null, false); }

      // Make sure the password is correct
      client.verifySecret(secret, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, client);
      });
    });
  }
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {

    console.log("Calling Beaer Strategy authentication");
    console.log("Access Token: " + accessToken);

    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

// passport.use(new BearerStrategy(
//   function(tokenUserId, accessToken, callback) {
//     Token.findOne({userId: tokenUserId }, function (err, token) {
//       if (err) { return callback(err); }

//       // No token found
//       if (!token) { return callback(null, false); }

//       // Make sure the access token value is correct
//       token.verifySecret(accessToken, function(err, isMatch) {
//         if (err) { return callback(err); }

//         // Password did not match
//         if (!isMatch) { return callback(null, false); }

//         // Success
//         return callback(null, token);
//       });

//       User.findOne({ _id: token.userId }, function (err, user) {
//         if (err) { return callback(err); }

//         // No user found
//         if (!user) { return callback(null, false); }

//         // Simple example with no scope
//         callback(null, user, { scope: '*' });
//       });
//     });
//   }
// ));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });