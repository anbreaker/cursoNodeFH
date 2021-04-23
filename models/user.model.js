const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is mandatory'],
    },
    email: {
      type: String,
      required: [true, 'The email is mandatory'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'The password is mandatory'],
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      required: [true, 'The role is mandatory'],
      emun: ['ADMIN_ROLE', 'USER_ROLE', 'SALE_ROLE'],
    },
    status: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// To send response object without password or __version...
// Need function to use this!!
userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;

  return user;
};

module.exports = model('User', userSchema);
