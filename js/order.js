$(function () {

    tokenData = '0da0cfcfb1582ab4479b745936f4deec';

    // tokenData = window.base.getLocalStorage('token');

    if(!tokenData){
        window.location.href = 'home.html';
    }

    getOrder();
    getUserInfo();
    getUserPoin()

    function getOrder() {
        var params = {
            'url': 'order/summary',
            'type':'post',
            'data':{token:tokenData},
            sCallback:function (res) {
                getOrderBySelf(res);

                $('.Pokemon').click(function (e) {
                    var id = $(e.target).attr("id");

                    //已经支付过的不能再次支付
                    if($('#'+id).text() == ' 已 支 付 '){
                        layer.msg('已支付');
                        return;
                    }

                    window.base.wxConfig();
                    window.base.pay(id, tokenData);
                });

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
                "<img src="+ data[i].snap_img +" class='itempic J_ItemImg'>" +
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
                "<div  style='font-size: 14px;color: #fff;background-color: #dd514c;border-color: #dd514c;display: inline-block;margin-bottom: 0;padding: 0.5em 1em;' class='Pokemon' id="+ data[i]['id'] +">" +
                "<script>if("+ data[i].status +"== 1){$('#"+ data[i]['id'] +"').text(' 支 付 ');}else{$('#"+ data[i]['id'] +"').text(' 已 支 付 ');}</script></div>" +
                "</li>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        return str;
    }

    //获取用户基本信息
    function getUserInfo() {
        var params = {
            'type':'post',
            'url':'token/userInfo',
            'data':{token:tokenData},
            sCallback:function(res){
                console.log(res);
                userInfo(res);
            },
            eCallback:function(e){

            }
        }

        window.base.getData(params);
    }

    function userInfo(res) {
        if(!res){return ;}
        $('#user a img').attr('src', res.headimgurl);
        $('#user em').text(res.nickname);
    }

    function getUserPoin(){
        var params = {
            'type':'get',
            'url': 'oauth/getUserPoin?token='+tokenData,
            sCallback:function(res){
                console.log(res);

            },
            eCallback:function (res) {
                console.log('请求失败');
            }
        };
        window.base.getData(params);
    }

});