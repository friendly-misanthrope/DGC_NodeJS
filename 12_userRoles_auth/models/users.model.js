const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [4, "Email must be at least 4 characters"],
    maxLength: [32, "Email must be between 4 and 32 characters"],
    validate: [isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
  },
  resetLink: {
    type: String,
    default: ''
  },
  employee: {
    type: Schema.Types.ObjectId || null,
    ref: "Employee"
  }
}, { timestamps: true });


//* Mongoose Middleware
// set virtual confirmPassword field to value in form input
UsersSchema.virtual('confirmPassword')
  .get(() => this.confirmPassword)
  .set((val) => this.confirmPassword = val);

// Validate that passwords match
UsersSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must match');
  }
  next();
});

// Prior to saving user in DB, hash the PW and
// overwrite the newUser.password with salted password hash
UsersSchema.pre('save', async function(next) {
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});


module.exports = mongoose.model('User', UsersSchema);