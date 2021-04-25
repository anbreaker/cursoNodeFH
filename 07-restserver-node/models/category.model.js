const { Schema, model } = require('mongoose');

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Category Name is mandatory'],
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

module.exports = model('Categoria', CategorySchema);
