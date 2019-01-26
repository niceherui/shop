window.wx={
    g_restUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=wx0b0cd5bf0d5fbea4&redirect_uri=qnb.xsqnb.com&response_type=code&scope=snsapi_userinfo#wechat_redirect',

    getData:function(params){
        if(!params.type){
            params.type='get';
        }
        console.log(params);
        var that=this;
        $.ajax({
            type:params.type,
            url:this.g_restUrl,
            beforeSend: function (XMLHttpRequest) {
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

}
