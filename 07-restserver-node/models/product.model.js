const { Schema, model } = require('mongoose');

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is mandatory.'],
      unique: [true, 'This Product, already exists.'],
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
    cost: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// To send response object without __version...
// Need function to use this!!
ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...produtc } = this.toObject();
  produtc.uid = _id;

  return produtc;
};

module.exports = model('Product', ProductSchema);
