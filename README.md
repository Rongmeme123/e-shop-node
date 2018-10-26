## e-shop-node

this project is for web assignment

## dependencies

resize picture with gm module which depends on GraphicsMagick.

```
brew install graphicsmagick
```

## usage

Firstly you should npm install to install dependencies.

dev

```
npm run dev
```

pro

```
npm run pro
```

kill

```
npm run kill
```

Enter http://18.136.50.163 to visit the index.

Enter http://18.136.50.163/admin to visit the admin index.

## struct

```
├── bin
│   └── www.js (launch)
├── config
│   ├── image.js
│   ├── index.js
│   └── web.js
├── db
│   ├── DBConfig.js
│   └── index.js (mysql)
├── index.js
├── routes
│   ├── apis
│   │   └── index.js (ajax apis)
│   ├── index.js
│   └── views
│       └── index.js (server views)
├── service
│   ├── category.js
│   ├── index.js
│   └── product.js
└── views (template)
    ├── admin
    │   ├── category
    │   │   └── index.ejs (admin category)
    │   ├── common
    │   │   ├── footer.ejs
    │   │   ├── header.ejs
    │   │   ├── html-head.ejs
    │   │   └── side-nav.ejs
    │   ├── index.ejs (admin index)
    │   └── product
    │       └── index.ejs (admin product)
    └── business
        ├── category
        │   ├── index.ejs (category)
        │   └── product-grid.ejs
        ├── common
        │   ├── footer.ejs
        │   ├── header.ejs
        │   ├── html-head.ejs
        │   └── side-nav.ejs
        └── product
            ├── index.ejs (product)
            ├── product-detail.ejs
            └── product-info.ejs
```






