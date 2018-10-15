const db = require('../db');

module.exports = {
    queryAll: async () => {
        const result = await db.query(`select * from product`);
        return result;
    },
    queryProductsByCatid: async (catid) => {
        const result = await db.query(`select * from product where catid=${catid}`);
        return result;
    },

    queryOneByPid: async (pid) => {
        const result = await db.query(`select * from product where pid=${pid}`);
        return result;
    },

    addOne: async (catid, name, price, description) => {
        const result = await db.query(`insert into product(catid, name, price, description) values(${catid}, '${name}', ${price}, '${description}')`);
        return result;
    },
    updateOne: async (pid, name, price, description) => {
        const result = await db.query(`update product set name='${name}', price=${price}, description='${description}' where pid=${pid}`);
        return result;
    },
    
    deleteOne: async (pid) => {
        const result = await db.query(`delete from product where pid=${pid}`);
        return result;
    },
}