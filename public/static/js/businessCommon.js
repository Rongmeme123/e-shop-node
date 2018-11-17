var _eShop = window._eShop || {
    initNavHeaderHover: function() {
        // nav header
        $('._shopping_list').hover(function(e) {
            if (e.type === 'mouseenter') {
                $(this).addClass('panel-unfold');
            } else if (e.type === 'mouseleave') {
                $(this).removeClass('panel-unfold');
            }
            e.stopPropagation();
        });
    },
    initNavCartList: function() {
        // 购物车的商品列表
        var _totalCartList = [];

        // 更新_totalCartList到localStorage里
        function updateCartList() {
            // 计算商品价格总和
            var totalAmount = _totalCartList.reduce(function(p, n) {
                p += n.price * n.quantity;
                return p;
            }, 0);
            $('.mini-total-amount').find('strong').text(totalAmount);

            // localstorage里不存price
            var list = _totalCartList.map(function(item) {
                return {
                    pid: item.pid,
                    quantity: item.quantity
                }
            });
            if (list.length > 0) {
                localStorage.setItem('cartList', JSON.stringify(list));
            } else {
                localStorage.removeItem('cartList');
            }
        }

        // 从localStorage里获取数据，ajax根据pid获取name和price等
        function getCartListByAjax() {
            var cartListStr = localStorage.getItem('cartList');
            if (cartListStr) {
                var cartList = JSON.parse(cartListStr);
                // store totalCartList
                _totalCartList = cartList;
                var pids = cartList.map(function(item) {
                    return item.pid;
                });
                if (pids.length === 0) return;
                axios.post('/api/getProductsByPids', {
                    pids: pids
                })
                    .then(function(response) {
                        if (response.data && response.data.code === 200) {
                            response.data.data.forEach(function(product) {
                                var filterList = _totalCartList.filter(function(item) {
                                    if (item.pid == product.pid) {
                                        item.price = product.price;
                                    }
                                    return item.pid == product.pid;
                                });
                                var result = Object.assign(product, {
                                    quantity: filterList[0].quantity
                                })

                                appendToCart(false, result);
                            });
                            updateCartList();
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

        }

        // 把数据添加到页面上的cart列表里
        function appendToCart(isClick, product) {
            // 如果是点击addToCart按钮，需要判断是不是已经有了这个商品
            if (isClick) {
                var filterItem = _totalCartList.filter(function(item) {
                    return item.pid == product.pid;
                });
                // 如果_totalCartList已经有了这个pid，就不要加了
                if (filterItem.length > 0) return;

                _totalCartList.push({
                    pid: product.pid,
                    quantity: product.quantity,
                    price: product.price
                });
                updateCartList();
            }

            var liHtml = template.render(`
    <li data-pid="<%=pid%>">
        <div class="mini-cart-img">
            <a href="/product?pid=<%=pid%>">
                <img src="<%=image_thumbnail%>" alt="">
            </a>
        </div>
        <div class="mini-cart-price">
            $
            <strong><%=price%></strong>
        </div>
        <div class="mini-cart-title">
            <a href="/product?pid=<%=pid%>"><%=name%></a>
        </div>
        <div class="mini-cart-del">
            <a href="javascript:;">delete</a>
        </div>
        <div class="mini-cart-counter">
            <em class="counter-btn minus">-</em>
            <input readonly class="counter-input" type="text" value="<%=quantity%>" />
            <em class="counter-btn add">+</em>
        </div>
    </li>
    `, product);
            $('.mini-cart-bd').append(liHtml);
        }

        // 点击cart里的加减号
        $(".mini-cart-bd").on('click', '.counter-btn', function(e) {
            e.preventDefault();
            var $li = $(this).closest('li');
            var pid = $li.data('pid');
            var $input = $li.find('.counter-input');
            var quantity = parseInt($input.val());
            if ($(this).hasClass('minus')) {
                if (quantity == 1) {
                    alert('quantity of product is at least 1');
                    return;
                } else {
                    quantity--;
                    $input.val(quantity - 1);
                }
            } else if ($(this).hasClass('add')) {
                quantity++;
            }
            $input.val(quantity);

            _totalCartList.forEach(function(item) {
                if (item.pid == pid) {
                    item.quantity = quantity;
                }
            });

            updateCartList();
        });

        // 点击cart里的delete
        $(".mini-cart-bd").on('click', '.mini-cart-del', function(e) {
            e.preventDefault();
            var $li = $(this).closest('li');
            var pid = $li.data('pid');
            var toRemovedIndex = 0;
            $li.remove();
            _totalCartList.filter(function(item, index) {
                if (item.pid == pid) {
                    toRemovedIndex = index;
                }
            });
            _totalCartList.splice(toRemovedIndex, 1);
            updateCartList();
        });

        // 执行ajax
        getCartListByAjax();
    },
    initNavLogin: function() {
        var isLogin = (document.cookie.match(/isLogin=([^;]+)/) || [])[1] || '';
        if (!isLogin) return;
        axios.post('/api/getLoginfo', null)
        .then(function(response) {
            if (response.data && response.data.code === 200){
                data = response.data.data;
                $('._login_group').html(`
                <span id="_personality"><a href="/user">${data.name}</a></span>
                <span id="_logout">signout</span>
                `);
                $('#_logout').off().on('click', function() {
                    axios.post('/api/logout', null)
                    .then(function(response) {
                        if (response.data && response.data.code === 200){
                            $('._login_group').html(`
                            <span id="_signin"><a href="/signin">signin</a></span>
                            <span id="_signup"><a href="/signup">signup</a></span>
                            `);
                        }
                    })
                });
            }
        })
    }

}

_eShop.initNavHeaderHover();
_eShop.initNavCartList();
_eShop.initNavLogin();
