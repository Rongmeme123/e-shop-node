const router = require('koa-router')();
const category = require('./category');
const product = require('./product');
const user = require('./user');
const order = require('./order');

// category

router.post('/getAllCategories', category.getAllCategories);

router.post('/updateCategory', category.updateCategory);

router.post('/deleteCategory', category.deleteCategory);

// product

router.post('/getProductsByCatid', product.getProductsByCatid);

router.post('/getAllProducts', product.getAllProducts);

router.post('/updateProduct', product.updateProduct);

router.post('/deleteProduct', product.deleteProduct);

router.post('/getProductsByPids', product.getProductsByPids);

// user

router.post('/signup', user.signup);

router.post('/signin', user.signin);

router.post('/getLoginfo', user.getLoginfo);

router.post('/logout', user.logout);

router.post('/changeUserName', user.changeUserName);

router.post('/changePassword', user.changePassword);

// order
router.post('/payMoney', order.payMoney);

module.exports = router;