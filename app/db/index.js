
const mysql = require('mysql');
const DBConfig = require('./DBConfig');

var pool = mysql.createPool(DBConfig.mysql);


exports.release = function(connection) {
    connection.end(function(error) {
        console.log('Connection closed');
    });
};

exports.query = function(sql, values) {
    console.time(`[sql time] --- exec ${sql}`);
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err); // not connected!
            } else {
                // Use the connection
                connection.query({
                    sql: sql,
                    timeout: 20000,
                }, values, function(error, results, fields) {
                    console.timeEnd(`[sql time] --- exec ${sql}`);
                    if (error) {
                        console.log('DB-执行查询语句异常！');
                        reject(error);
                    } else {
                        resolve(results);
                    }

                    // When done with the connection, release it.
                    connection.release(function(error) {
                        if (error) {
                            console.log('DB-关闭数据库连接异常！');
                            reject(error);
                        }
                    });
                });
            }
        });
    });
}

