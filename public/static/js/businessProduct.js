// 点击addToCart
$(".info-wrap").on('click', '._btn-add', function(e) {
    var $intro = $('.product-intro');
    var pid = $intro.data('pid');
    var name = $intro.find('.sku-name').text();
    var thumbnail = $intro.find('.preview img').attr('src');
    var price = parseInt($intro.find('.price strong').text().replace('\$', ''));
    appendToCart(true, {
        name: name,
        pid: pid,
        price: price,
        image_thumbnail: thumbnail,
        quantity: parseInt($intro.find('.counter-input').val())
    });
});

// 点击intro里的加减号
$(".info-wrap").on('click', '.counter-btn', function(e) {
    var $intro = $('.product-intro');
    var pid = $intro.data('pid');
    var $input = $intro.find('.counter-input');
    var quantity = parseInt($input.val());
    if ($(this).hasClass('minus')) {
        if (quantity == 1) {
            alert('quantity of product is at least 1');
            return;
        } else {
            quantity --;
            $input.val(quantity - 1);
        }
    } else if($(this).hasClass('add')) {
        quantity ++;
    }
    $input.val(quantity);
});