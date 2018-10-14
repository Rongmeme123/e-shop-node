const db = require('../db');

module.exports = {
    queryAll: async () => {
        const result = await db.query('select * from category');
        return result;
    }
}