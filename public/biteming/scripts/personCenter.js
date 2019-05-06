$(function () {
    var doc=$(document);

    //店主促销员tab切换
    doc.on('click','.js-graph-item',function () {
        var index=$(this).index();

        $(this).addClass('active').siblings('.js-graph-item').removeClass('active');
        $('.js-graph-wrapper .js-graph-list').eq(index).addClass('active').siblings('.js-graph-list').removeClass('active');
    })
});