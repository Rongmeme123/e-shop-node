const path = require('path');

module.exports = {
    maxSize: 5 * 1024 * 1024,
    uploadDir: path.resolve(process.cwd(), 'public/static/upload')
}