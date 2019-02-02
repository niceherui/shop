$(function(){


    // window.base.deleteLocalStorage('token');
    // localStorage.removeItem('token');
    // var token = window.base.getLocalStorage('token');
    // alert(token);

    if(token = GetQueryString('token')){
        window.base.setLocalStorage('token', token);
    }
    // var token = window.base.getLocalStorage('token');
    // alert(token);


    /**
     * 获取地址栏中的指定参数
     */
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

});

