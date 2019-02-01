$(function(){

        // if(!window.base.getLocalStorage('token')){
        //     window.location.href = 'login.html';
        // }
    tokenData = localStorage.getItem('token');

    function pay(data) {
        var params={
            url:'pay/pre_order',
            data:{id:data,token:tokenData},
            type:'POST',
            tokenFlag:true,
            sCallback:function(res) {
                console.log(res);
                wx.chooseWXPay({
                    timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                    package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.paySign, // 支付签名
                    success: function (res) {
                        alert(res);
                    },
                    cancel: function () {

                    },
                    fail

                });

            },
            eCallback:function (res) {
                console.log(res);
            }
        };
        window.base.getData(params);
    }

    function wxConfig() {
        var params = {
            url: "oauth/signature?url=" + encodeURIComponent(location.href.split('#')[0]),
            type: 'GET',
            tokenFlag: true,
            sCallback: function (res) {
                console.log(res);

                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx0b0cd5bf0d5fbea4', // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    alert(1);
                });
                wx.error(function () {
                    alert(2);
                });
            },
            eCallback: function (res) {
                console.log(res);
            }
        };
        window.base.getData(params);
    }
    getOrderShop();

    /**
     * 加载订单页面
     */
    function getOrderShop() {
         ids = localStorage.getItem('ids');
        ids = JSON.parse(ids);
        orderShop = getShopCacheByOrder(ids);
        var result = mixHtml(orderShop);
        $('#STR').append(result['str']);
        $('#allPrice').text(result['allPrice']);
    }



    /**
     * 下订单，调用服务器下订单Api，
     * 检测库存，有库存下单成功，订单写入数据库
     * 返回true,再调用支付接口；
     */
    function placeOrder() {
        var orderData = getShopCacheByOrder(ids, placeOrder);
        var params = {
            'url' : 'order/place?XDEBUG_SESSION_START=19914',
            'type': 'post',
            'data': {order:orderData,token:tokenData},
            'sCallback' : function (res) {

                if(res.pass == true){
                    console.log(res);
                    console.log(res.orderID);
                    //调用wx.config()
                    wxConfig();
                    pay(res.orderID);
                }
            },
            'eCallbakc' : function (e) {
                console.log(e);
            }
        }
        window.base.getData(params);
    }


    /**
     * 从缓存中获取订单商品数据
     * @param data
     */
    function getShopCacheByOrder(data, type) {
        var shop = localStorage.getItem('shop');
        shop = JSON.parse(shop);

        var orderObj = {};
        for(var i in data){
            for (var s in shop){
                if(shop[s]['id'] == data[i]){
                    if(type == placeOrder){
                        orderObj[s] = {
                            'product_id': shop[s]['id'],
                            'count': shop[s]['count'],
                        }
                    }else{
                        orderObj[s] = shop[s];
                    }
                }
            }
        }
        return orderObj;
    }

    /**
     * 拼接html , 和总支付金额
     * @param data
     * @returns {{allPrice: number, str: string}}
     */
    function mixHtml(data) {
        var str = ''
            allPrice = 0;

        for(var i in data){
            allPrice += parseInt(data[i]['price'] * 100) / 100;

            str += "<ul class='item-content clearfix'>" +
                "<div class='pay-phone'>" +
                "<li class='td td-item'>" +
                "<div class='item-pic'>" +
                "<a href='#' class='J_MakePoint'>" +
                "<img  style='width: 80px;height: 80px;' src="+ data[i].main_img_url +" class='itempic J_ItemImg'></a>" +
                "</div>" +
                "<div class='item-info'>" +
                "<div class='item-basic-info'>" +
                "<a href='#' class='item-title J_MakePoint' data-point='tbcart.8.11'>" + data[i].name + "</a>" +
                "</div>" +
                "</div>" +
                "</li>" +
                "" +
                "<li class='td td-price'>" +
                "<div class='item-price price-promo-promo'>" +
                "<div class='price-content'>" +
                "<em class='J_Price price-now'>"+ data[i].price +"</em>" +
                "</div>" +
                "</div>" +
                "</li>" +
                "</div>" +
                "" +
                "</ul>";
        }
        var data = {
            'allPrice':allPrice,
            'str':str,
        }
        return data;
    }

    /**
     * 点击支付事件
     */
    $('#pay').click(function () {
        placeOrder();
    });
});

