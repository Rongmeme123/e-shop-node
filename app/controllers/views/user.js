const userService = require('../../service').user;
const orderService = require('../../service').order;

module.exports = {
    signin: async (ctx, next) => {
        await ctx.render('user/signin', {
            csrf: ctx.csrf,
            activeTab: 0,
            title: 'user signin',
            page: 'user signin',
            css: '/static/css/signin',
            js: '/static/js/signin',
        });
    },
    signup: async (ctx, next) => {
        await ctx.render('user/signin', {
            csrf: ctx.csrf,
            activeTab: 1,
            title: 'user signup',
            page: 'user signup',
            css: '/static/css/signin',
            js: '/static/js/signin',
        });
    },
    info: async (ctx, next) => {
        const authToken = ctx.cookies.get('auth');
        const user = await userService.getUserByToken(authToken);
        await ctx.render('user', {
            csrf: ctx.csrf,
            userName: user.name,
            isAdmin: user.isadmin,
            title: 'user center',
            page: 'userInfo',
            css: '/static/css/userInfo',
            js: '/static/js/userInfo',
        });
    },
    changePwd: async (ctx, next) => {
        const authToken = ctx.cookies.get('auth');
        const user = await userService.getUserByToken(authToken);
        await ctx.render('user/changePwd', {
            csrf: ctx.csrf,
            userName: user.name,
            isAdmin: user.isadmin,
            title: 'user center changePwd',
            page: 'changePwd',
            css: '/static/css/userInfo',
            js: '/static/js/changePwd',
        });
    },
    orders: async (ctx, next) => {
        const authToken = ctx.cookies.get('auth');
        const user = await userService.getUserByToken(authToken);
        const orders = await orderService.getRecentOrdersByUid(user.uid);
        await ctx.render('user/orders', {
            csrf: ctx.csrf,
            userName: user.name,
            isAdmin: user.isadmin,
            title: 'user orders',
            page: 'orders',
            css: '/static/css/adminProduct',
            js: '/static/js/adminProduct',
            orders,
        });
    }
}

