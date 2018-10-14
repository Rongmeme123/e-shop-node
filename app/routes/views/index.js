const router = require('koa-router')();
const srConfig = require('../../config/staticResource');

const routerConfigList = [
    { url: '/', action: 'category', routeFn: require('./category') },
    { url: '/product', action: 'product', routeFn: require('./product') },
]

routerConfigList.forEach((item) => {
    const { url, action, routeFn } = item;
    router.get(`${url}`, routeFn(Object.assign({}, srConfig['common'], srConfig[action])));
});

module.exports = router;