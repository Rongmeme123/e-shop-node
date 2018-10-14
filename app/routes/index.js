const router = require('koa-router')();
const apiRoutes = require('./apis');
const viewRoutes = require('./views');

// router.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());
router.use('', viewRoutes.routes());

module.exports = router;
