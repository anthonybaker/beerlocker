// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var TokenSchema   = new mongoose.Schema({
  value: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);



// // Load required packages
// var mongoose = require('mongoose');

// // Define our token schema
// var TokenSchema   = new mongoose.Schema({
//   value: { type: String, required: true },
//   userId: { type: String, required: true },
//   clientId: { type: String, required: true }
// });

// // Execute before each user.save() call
// TokenSchema.pre('save', function(callback) {
//   var token = this;

//   // Break out if the password hasn't changed
//   if (!token.isModified('value')) return callback();

//   // Password changed so we need to hash it
//   bcrypt.genSalt(5, function(err, salt) {
//     if (err) return callback(err);

//     bcrypt.hash(token.value, salt, null, function(err, hash) {
//       if (err) return callback(err);
//       token.value = hash;
//       callback();
//     });
//   });
// });

// // Function to verify password
// TokenSchema.methods.verifyToken = function(value, cb) {
//   bcrypt.compare(value, this.value, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// // Export the Mongoose model
// module.exports = mongoose.model('Token', TokenSchema);