const db = require('../db');

module.exports = {
    queryAll: async () => {
        const result = await db.query(`select * from product`);
        return result;
    },
    queryByCatid: async (catid, startId, pageSize) => {
        const result = await db.query('select * from product where catid=? limit ?,?', [catid, startId, pageSize]);
        return result;
    },

    queryOne: async (pid) => {
        const result = await db.query('select * from product where pid=?', [pid]);
        return result[0];
    },

    queryByPids: async (pids) => {
        let holderStr = '?';
        for(let i = 1; i < pids.length; i ++) {
            holderStr += ',?';
        }
        const result = await db.query(`select * from product where pid in (${holderStr})`, pids);
        return result;
    },

    addOne: async (catid, name, price, description) => {
        const result = await db.query('insert into product(catid, name, price, description) values(?, ?, ?, ?)', [catid, name, price, description]);
        return result;
    },
    updateOne: async (pid, name, price, description) => {
        const result = await db.query('update product set name=?, price=?, description=? where pid=?', [name, price, description, pid]);
        return result;
    },
    
    deleteOne: async (pid) => {
        const result = await db.query('delete from product where pid=?', [pid]);
        return result;
    },
}