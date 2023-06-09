const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    address:{
        type: String
    },
    userImage:{
        type: String,
        default:"https://via.placeholder.com/150"
    }
});

userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }

            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

//   UserSchema.methods.comparePassword = function(password, callback) {
//     bcrypt.compare(password, this.password, function(error, isMatch) {
//       if (error) {
//         return callback(error)
//       } else {
//         callback(null, isMatch)
//       }
//     })
//   }

module.exports = mongoose.model('User', userSchema)