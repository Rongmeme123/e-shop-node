// 点击addToCart
$(".grid").on('click', '.btn-add', function(e) {
    e.preventDefault();
    var $li = $(this).closest('.g-item');
    var pid = $li.data('pid');
    var name = $li.data('name');
    var thumbnail = $li.find('.p-img img').attr('src');
    var price = parseInt($li.find('.p-price strong').text().replace('\$', ''));
    appendToCart(true, {
        name: name,
        pid: pid,
        price: price,
        image_thumbnail: thumbnail,
        quantity: 1
    });
});