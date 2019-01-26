$(function () {
    getRecent();

    function getRecent() {
        var params = {
            url:'product/recent',
            type:'get',
            sCallback: function (res) {
                console.log(res);
                var str = getProductStr(res);
                console.log(str);
                $("#shop").append(str);

            },
            eCallback:function (e) {
                console.log(e);
            }
        }
        window.base.getData(params);
    }

    function getProductStr(res) {
        if(res){
            var length = res.length,
                        str = '', item;
            if(length > 0) {
                for (var i = 0; i < length; i++) {
                    item = res[i];
                    str += '<div class="am-u-sm-4 am-u-lg-3 ">' +
                        '<div class="info ">' +
                        '<h3>' + item.name + '</h3>' +
                        '<h4>' + item.price + '</h4>' +
                        '</div>' +
                        '<div class="recommendationMain one">' +
                        '<a href="introduction.html?id='+ item.id +'"><img src=' + item.main_img_url + '></img></a>' +
                        '</div>' +
                        '</div>';
                }
                return str;
            }
        }
        return '';
    }
});