const router = require('koa-router')();
const apiRoutes = require('../controllers/apis');
const viewRoutes = require('../controllers/views');

router.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());
router.use('', viewRoutes.routes());

module.exports = router;
