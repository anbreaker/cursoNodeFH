const { searchUser, searchCategory, searchProducts } = require('../helpers/searchs');

const collectionsAllowed = ['users', 'categories', 'products', 'roles'];

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection))
    return res
      .status(400)
      .json({ msg: `Collections allowed to search ${collectionsAllowed}` });

  switch (collection) {
    case 'users':
      searchUser(term, res);
      break;
    case 'categories':
      searchCategory(term, res);
      break;
    case 'products':
      searchProducts(term, res);
      break;
    default:
      res.status(500).json({ msg: 'Forget to search...' });
  }
};

module.exports = { search };
