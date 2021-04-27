const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is mandatory'],
    },
    email: {
      type: String,
      required: [true, 'The email is mandatory'],
      unique: [true, 'This email, already exists.'],
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
      default: 'USER_ROLE',
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
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;

  return user;
};

module.exports = model('User', UserSchema);
