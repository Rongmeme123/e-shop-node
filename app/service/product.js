const db = require('../db');

module.exports = {
    queryProductsByCatid: async (catid) => {
        const result = await db.query(`select * from product where catid=${catid}`);
        return result;
    },

    queryOneByPid: async (pid) => {
        const result = await db.query(`select * from product where pid=${pid}`);
        return result;
    }
}