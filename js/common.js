window.base={
    g_restUrl:'http://www.pokemon.com/api/v1/',

    getData:function(params){
        if(!params.type){
            params.type='get';
        }
        var that=this;
        $.ajax({
            type:params.type,
            url:this.g_restUrl+params.url,
            data:params.data,
            contentType: params.contentType,
            beforeSend: function (XMLHttpRequest) {
                // if (params.tokenFlag) {
                //     XMLHttpRequest.setRequestHeader('token', that.getLocalStorage('token'));
                // }
            },
            success:function(res){
                params.sCallback && params.sCallback(res);
            },
            error:function(res){

                params.eCallback && params.eCallback(res);
            }
        });
    },

    setLocalStorage:function(key,val){
        var exp=new Date().getTime()+2*24*60*60*100;  //令牌过期时间
        var obj={
            val:val,
            exp:exp
        };
        localStorage.setItem(key,JSON.stringify(obj));
    },

    getLocalStorage:function(key){
        var info= localStorage.getItem(key);
        if(info) {
            info = JSON.parse(info);
            if (info.exp > new Date().getTime()) {
                return info.val;
            }
            else{
                this.deleteLocalStorage('token');
            }
        }
        return '';
    },

    deleteLocalStorage:function(key){
        return localStorage.removeItem(key);
    },

    wxConfig:function () {
        var params = {
            url: "oauth/signature?url=" + encodeURIComponent(location.href.split('#')[0]),
            type: 'GET',
            tokenFlag: true,
            sCallback: function (res) {
                console.log(res);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx0b0cd5bf0d5fbea4', // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    // alert(1);
                });
                wx.error(function () {
                    alert('调用wxConfig错误');
                });

            },
            eCallback: function (res) {
                alert('调用后台signature api 错误');
                console.log(res);
            }
        };
        window.base.getData(params);
    },

    pay:function(data, tokenData){
        var params = {
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
                        //删除购物车中已经支付的商品
                        //跳转页面
                        window.location.href = 'personindex.html';

                    },
                    cancel: function () {
                        window.location.href = 'personindex.html';

                    },
                    fail: function (){
                        // alert('支付失败');
                    }
                });

            },
            eCallback:function (e) {
                alert('调用后台支付失败');
                console.log(e);
            }
        };
        window.base.getData(params); 
    },

}
