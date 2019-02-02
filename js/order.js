$(function () {

    getOrder();

    function getOrder() {
        var params = {
            'url': 'order/summary',
            'type':'post',
            'data':{'page':1,'count':5},
            sCallback:function (res) {
                console.log(res);
                getOrderBySelf(res);
            },
            eCallback:function (e) {

            }

        }
        window.base.getData(params);
    }


    function getOrderBySelf(res) {
        var str = mixOrder(res);
        $('.order-status5').append(str);
    }

    function mixOrder(data) {
        data = data.data.data;
        console.log(data);
        var str = "";
        for(var i in data){
            str += "<div class='order-title'>" +
                "<div class='dd-num'>订单编号：<a href='javascript:;' id='orderNO'>"+ data[i].order_no +"</a></div>" +
                "<span>成交时间：2015-12-20</span>" +
                "<!--    <em>店铺：小桔灯</em>-->" +
                "</div>" +
                "<div class='order-content'>" +
                "<div class='order-left'>" +
                "<ul class='item-list'>" +
                "<li class='td td-item'>" +
                "<div class='item-pic'>" +
                "<a href='#' class='J_MakePoint'>" +
                "<img src='../images/kouhong.jpg_80x80.jpg' class='itempic J_ItemImg'>" +
                "</a>" +
                "</div>" +
                "<div class='item-info'>" +
                "<div class='item-basic-info'>" +
                "<a href='#'>" +
                "<p>"+ data[i].snap_name +"</p>" +

                "</a>" +
                "</div>" +
                "</div>" +
                "</li>" +
                "<li class='td td-price'>" +
                "<div class='item-price'>" +
                // "333.00" +
                "</div>" +
                "</li>" +
                "<li class='td td-number'>" +
                "<div class='item-number'>" +
                // "<span>×</span>2" +
                "</div>" +
                "</li>" +
                "<li class='td td-operation'>" +
                "<div class='item-operation'>" +
                "" +
                "</div>" +
                "</li>" +
                "</ul>" +
                "</div>" +
                "<div class='order-right'>" +
                "<li class='td td-amount'>" +
                "<div class='item-amount'>合计："+
                "<span>"+ data[i]['total_price'] +"</span>"+

                "</div>" +
                "</li>" +
                "<div class='move-right'>" +
                "<li class='td td-status'>" +
                "<div class='item-status'>" +
                // "<p class='order-info'><a href='orderinfo.html'>订单详情</a></p>" +
                // "<p class='order-info'><a href='logistics.html'>查看物流</a></p>" +
                "</div>" +
                "</li>" +
                "<li class='td td-change'>" +
                "<div class='am-btn am-btn-danger anniu'>" +
                "&nbsp 付 款 &nbsp</div>" +
                "</li>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        return str;
    }
});