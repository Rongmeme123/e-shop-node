const { exec } = require('shelljs');

exec('rm -rf public/dist && parcel build public/css/category.scss public/css/product.scss -d public/dist/css && parcel build public/js/category.js public/js/product.js -d public/dist/js');