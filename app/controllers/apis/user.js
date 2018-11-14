const userService = require('../../service').user;
const { jwtConfig, cookieConfig } = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function validateEmail(email) {
    var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return emailReg.test(email);
}

module.exports = {
    signup: async (ctx, next) => {
        let { email, name, password } = ctx.request.body
        let flag = true;
        let msg = '';

        // 合法性校验
        if (email === '') {
            flag = false;
            msg = 'email cannot be empty';
        } else if (!validateEmail(email)) {
            flag = false;
            msg = 'email you input is not a email format';
        } else if (password === '') {
            flag = false;
            msg = 'password cannot be empty';
        } else if (password.length < 6) {
            flag = false;
            msg = 'length of password cannot be less than 6';
        }
    
        if (!flag) {
            ctx.body = {
                code: 201,
                data: {},
                msg,
            };
            await next(ctx);
            return;
        }
        // 验证email唯一性
        let users = await userService.queryByEmail(email)
        if (users.length > 0) {
            ctx.body = {
                code: 201,
                data: {},
                msg: 'email has been used'
            };
            await next(ctx);
            return;
        }
        // 生成salt
        const salt = await bcrypt.genSalt(10)
        // 对密码进行加密
        password = await bcrypt.hash(password, salt)
        // 储存到数据库
        const result = await userService.create(email, name, password)
        console.log(result);
        ctx.body = {
            code: 200,
            data: {},
        };
        await next(ctx);
    },
    signin: async (ctx, next) => {
        const { email, password, isRemember } = ctx.request.body
        let flag = true;
        let msg = '';
        console.log(email, password, isRemember)
        // 合法性校验
        if (email === '') {
            flag = false;
            msg = 'email cannot be empty';
        } else if (!validateEmail(email)) {
            flag = false;
            msg = 'email you input is not a email format';
        } else if (password === '') {
            flag = false;
            msg = 'password cannot be empty';
        } else if (password.length < 6) {
            flag = false;
            msg = 'length of password cannot be less than 6';
        }
    
        if (flag) {
            let users = await userService.queryByEmail(email)
            let user = users[0]
            if (user && await bcrypt.compare(password, user.password)) {
                let userId = user.uid
                ctx.body = {
                    code: 200,
                    data: {
                        user_id: userId
                    }
                }
                // token设置在cookie里
                const token = jwt.sign({
                    userId: userId,
                }, jwtConfig.secret, {
                    expiresIn: '3 days'
                });
                ctx.cookies.set('auth', token, cookieConfig);
                ctx.cookies.set('isLogin', 1, Object.assign({}, cookieConfig, {httpOnly: false}));
                await next(ctx);
                return;
            } else {
                flag = false;
                msg = 'email or password error';
            }
        }
        
        ctx.body = {
            code: 201,
            data: null,
            msg,
        };
        await next(ctx);
    },
    getLoginfo: async (ctx, next) => {
        const authToken = ctx.cookies.get('auth');
        const user = await userService.getUserByToken(authToken);
        ctx.body = {
            code: 200,
            data: user,
            msg: null
        };
        await next(ctx);
    },
    logout: async (ctx, next) => {
        userService.clearauthToken(ctx);
        ctx.body = {
            code: 200,
            data: null,
            msg: null
        };
        await next(ctx);
    },
    changeUserName: async (ctx, next) => {
        const authToken = ctx.cookies.get('auth');
        const { userName } = ctx.request.body;

        let flag = true;
        let msg = '';

        // 合法性校验
        if (userName === '') {
            flag = false;
            msg = 'email cannot be empty';
        }

        if (!flag) {
            ctx.body = {
                code: 201,
                data: {},
                msg,
            };
            await next(ctx);
            return;
        }

        const userId = await userService.verifyAuthToken(authToken);
        const result = await userService.updateUserName(userId, userName);
        ctx.body = {
            code: 200,
            data: user,
            msg: null
        };
        await next(ctx);
    },
    changePassword: async (ctx, next) => {
        const authToken = ctx.cookies.get('auth');
        let { password } = ctx.request.body;

        let flag = true;
        let msg = '';

        // 合法性校验
        if (password === '') {
            flag = false;
            msg = 'password cannot be empty';
        } else if (password.length < 6) {
            flag = false;
            msg = 'length of password cannot be less than 6';
        }

        if (!flag) {
            ctx.body = {
                code: 201,
                data: {},
                msg,
            };
            await next(ctx);
            return;
        }

        const userId = await userService.verifyAuthToken(authToken);

        // 生成salt
        const salt = await bcrypt.genSalt(10)
        // 对密码进行加密
        password = await bcrypt.hash(password, salt)
        const result = await userService.updatePassword(userId, password);

        userService.clearauthToken(ctx);

        ctx.redirect('/');
        await next(ctx);
    }
}
// admin
// email:admin@hetty.com  password:admin123