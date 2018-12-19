## e-shop-node

Enter http://18.136.50.163 to visit the index.

Enter http://18.136.50.163/admin to visit the admin index.

ajax and views routes are in route directory and templates are in views directory

### phase6

1. Including Facebook plugin in the main page. 
    - facebook iframe
2. SEO: Apply search engine optimized (or user-friendly) URLs when browsing products. 
    - nginx rewrite
    ``` 
    location / {
        rewrite ^/(\d+)-[0-9a-zA-Z]+/(\d+)-[0-9a-zA-Z]+$ /product?pid=$2 break;
        rewrite ^/(\d+)-[0-9a-zA-Z]+$ /?catid=$1 break;
    }
    ```
3. Supporting pagination/AJAX infinite scroll when browsing products in the main page.
    - ajax when scroll to bottom
4. Supporting HTML5 Drag-and-drop file selection in the admin panel
    - dragEvent