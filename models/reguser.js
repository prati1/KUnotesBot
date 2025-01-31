var mongoose = require('mongoose');

var registrationSchema = mongoose.Schema({
         firstName: String,
   lastName: String,
   username: {
       type: String,
       index: {
           unique: true
       }
   },

       email: {
        type: String,
        require: true,
          /* notEmpty: true,*/
           isEmail: {
               errorMessage: "Invalid Email"
           }
       },
       password: {
        type: String,
       required: true,
           notEmpty: true,
           isLength: {
               options: [{ min: 12}],
               errorMessage: "Must be at least 12 characters"
           },
           matches: {
               options: ["(?=.*[a-zA-Z])(?=.*[0-9]+).*", "g"],
               errorMessage: "Password must be alphanumeric."
           },
           errorMessage: "Invalid password"
       }
});

var User = module.exports = mongoose.model('User', registrationSchema);
 
 module.exports.getImages = function(callback, limit) {
 
 User.find(callback).limit(limit);
}