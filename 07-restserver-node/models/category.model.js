const { Schema, model } = require('mongoose');

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Category Name is mandatory'],
      unique: [true, 'This Category, already exists.'],
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// To send response object without __version...
// Need function to use this!!
CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.uid = _id;
  return data;
};

module.exports = model('Category', CategorySchema);
