const user = require('../dao').user;
const jwt = require('jsonwebtoken');
const { jwtConfig, cookieConfig } = require('../config')

const collection = {
    verifyAuthToken: async (token) => {
        if (!token) {
            throw {
                code: 401,
                msg: 'no authToken'
            };
        }
        const userId = await new Promise((resolve, reject) => {
            jwt.verify(token, jwtConfig.secret, (err, decoded) => {
                if (err) {
                    reject({
                        code: 401,
                        data: null,
                        msg: 'invalid authtoken'
                    });
                }
                resolve(decoded.userId)
            });
        });
        return userId;
    },
    create: async (email, name, password) => {
        const result = await user.addOne(email, name, password)
        return result;
    },
    queryOne: async (userId) => {
        const result = await user.queryOne(userId);
        return result;
    },
    queryByEmail: async (email) => {
        const result = await user.queryByEmail(email);
        return result;
    },
    getUserByToken: async (token) => {
        const userId = await collection.verifyAuthToken(token);
        const user = await collection.queryOne(userId);
        return user;
    },
    updateUserName: async (userId, userName) => {
        const result = await user.updateUserName(userId, userName);
        return result;
    },
    updatePassword: async (userId, password) => {
        const result = await user.updatePassword(userId, password);
        return result;
    },
    clearauthToken: (ctx) => {
        let cnf = Object.assign({}, cookieConfig, {maxAge: 0});
        ctx.cookies.set('auth', '', cnf);
        ctx.cookies.set('isLogin', '', cnf);
    }
}

module.exports = collection;