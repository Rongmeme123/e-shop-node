const compose = require('koa-compose');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config')
const { user: userService } = require('../service');

const jwtMiddleware = async (ctx, next) => {
    const authPathList = [/\/admin($|\/)/];
    const url = ctx.request.url;
    const isInAuth = authPathList.some((item) => item.test(url))
    if (isInAuth) {
        const token = ctx.cookies.get('auth');
        jwt.verify(token, jwtConfig.secret, async (err, decoded) => {
            if (err) {
                // failed to verify token and redirect to index
                ctx.redirect('/');
            }

            let userId = decoded.userId;
            let user = await userService.queryOne(userId);
            if (user.isadmin === 0) ctx.redirect('/');
        });
    }
    await next(ctx);
}

const authMiddleware = async (ctx, next) => {
    try {
        await next(ctx);
    } catch (error) {
        if (error.code === 401) {
            ctx.redirect('/');
        } else {
            console.log(error)
        }
    }
}

module.exports = compose([authMiddleware, jwtMiddleware]);