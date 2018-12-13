const order = require('../dao').order;
const userService = require('./user');

const collection = {
    queryAll: async () => {
        const result = await order.queryAll();
        return result;
    },
    queryByUid: async (uid, num=5) => {
        const result = await order.queryByUid(uid, num);
        return result;
    },
    queryByPaymentId: async (paymentId) => {
        const result = await order.queryByPaymentId(paymentId);
        return result ? result[0] : null;
    },
    addOne: async (paymentid, uid=0, orderinfo, description, paylink) => {
        const result = await order.addOne(paymentid, uid, orderinfo, description, paylink);
        return result;
    },
    updateOne: async (oid, status) => {
        const result = await order.updateOne(oid, status);
        return result;
    },
    getRecentOrders: async (num) => {
        const orders = await order.getRecentOrders(num);
        const uidList = orders.map((order) => order.uid);
        const someUsers = await userService.querySome(uidList);
        return orders.map((order) => {
            return Object.assign({}, order, {
                user: someUsers[order.uid] || {}
            });
        })
    },
    getRecentOrdersByUid: async (uid, num = 5) => {
        const orders = await order.getRecentOrdersByUid(uid, num);
        return orders;
    }
};

module.exports = collection;