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

var pageInfo = {
    page: 1,
    pageSize: 9
};
var canLoadNextPage = true;
var catid = $('.breadcrumb li:eq(1)').find('a').data('catid');

function loadNextPage(catid, page, pageSize) {
    axios.post('/api/getProductsByCatid', {
        catid: catid,
        page: page,
        pageSize: pageSize,
        _csrf: $('#_csrf').val()
    })
    .then(function(response) {
        if (response.data && response.data.code === 200){
            var data = response.data.data;
            if (data.items.length > 0) {
                pageInfo.page = data.page;
            }
            var htmlStr = data.items.map(function(item) {
                return `
        <li class="g-item" data-pid="${item.pid}" data-name="${item.name}">
            <a class="g-item-wrap" href="./product?pid=${item.pid}">
                <div class="p-img">
                    <img src="/static/upload/product${item.pid}_thumbnail.jpg" alt="">
                </div>
                <div class="p-price">
                    <strong>$${item.price}</strong>
                </div>
                <div class="p-des mult-line-ellipsis">
                    ${item.description}
                </div>
                <div class="p-tools">
                    <ul class="tags">
                        <li>
                            <em>新品</em>
                        </li>
                        <li>
                            <em>打折</em>
                        </li>
                    </ul>
                    <input class="btn btn-add" type="button" value="addToCart">
                </div>
            </a>
        </li>`}).join('');
            // append到列表里
            $('.grid').append(htmlStr);
            // 参考网上，会频繁请求，等500毫秒
            setTimeout(function() {
                canLoadNextPage = true;
            }, 500);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

// 滚动加载
$('.grid').on('scroll', function(event) {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > 250 && canLoadNextPage) {
        canLoadNextPage = false;
        loadNextPage(catid, pageInfo.page + 1, pageInfo.pageSize);
    }
})