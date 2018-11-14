const db = require('../db');

module.exports = {
    addOne: async (email, name, password) => {
        const result = await db.query('insert into user(email, name, password) values(?,?,?)', [email, name, password]);
        return result;
    },
    queryOne: async (userId) => {
        const result = await db.query('select uid, email, isadmin, name from user where uid=?', [userId]);
        return result[0];
    },
    queryByEmail: async (email) => {
        const result = await db.query('select * from user where email=?', [email]);
        return result;
    },
    updateUserName: async (userId, userName) => {
        const result = await db.query('update user set name=? where uid=?', [userName, userId]);
        return result;
    },
    updatePassword: async (userId, password) => {
        const result = await db.query('update user set password=? where uid=?', [password, userId]);
        return result;
    }
}