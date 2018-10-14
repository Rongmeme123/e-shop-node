// nav header
$('._shopping_list').hover(function() {
    $(this).toggleClass('panel-unfold');
});


// side nav
var productTmpl = `
<%list.forEach(function(item){%>
<li class="g-item">
    <a class="g-item-wrap" href="./product">
        <div class="p-img">
            <img src="./images/goods/iphonexs_max.jpg" alt="">
        </div>
        <div class="p-price">
            <strong>$<%=item.price%></strong>
        </div>
        <div class="p-des">
            <em><%=item.description%></em>
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
            <input class="btn btn-add" type="button" value="addToCart" />
        </div>
    </a>
</li>
<%})%>
`;
$('.nav .category').on('click', 'li:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.breadcrumb').find('li:eq(1) a').text($(this).text());
    $.post('/api/getProductsByCatid', {catid: $(this).data('catid')}, function(data, status) {
        if (status === 'success' && data.code === 200) {
            $('.grid').html(template.compile(productTmpl)({
                list: data.data
            }));
        }
    })
});
