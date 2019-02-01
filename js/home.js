$(function(){


    if(!localStorage.getItem('token')){
        var hello = GetQueryString('token');
        localStorage.setItem('token', hello);
    }
    var token = localStorage.getItem('token');
    console.log(token);
    alert(token);

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

