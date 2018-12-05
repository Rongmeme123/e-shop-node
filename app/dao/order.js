const db = require('../db');

module.exports = {
    queryAll: async () => {
        const result = await db.query('select * from orders');
        return result;
    },
    queryByUid: async (uid, num) => {
        const result = await db.query('select * from orders where uid=? limit ?', [uid, num]);
        return result;
    },
    queryByPaymentId: async (paymentId) => {
        const result = await db.query('select * from orders where paymentid=?', [paymentId]);
        return result;
    },
    addOne: async (paymentid, uid, orderinfo, description) => {
        const result = await db.query('insert into orders (paymentid, uid, orderinfo, description) values (?,?,?,?)', [paymentid, uid, orderinfo, description]);
        return result;
    },
    updateOne: async (oid, status) => {
        const result = await db.query('update orders set status=? where oid=?', [status, oid]);
        return result;
    },
    getRecentOrders: async (num) => {
        const result = await db.query('select * from orders order by oid desc ' + (num ? 'limit ?' : ''), [num]);
        return result;
    },
    getRecentOrdersByUid: async (uid, num) => {
        const result = await db.query('select * from orders where uid = ? order by oid desc ' + (num ? 'limit ?' : ''), [uid, num]);
        return result;
    },
}