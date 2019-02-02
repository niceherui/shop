$(function () {

    getBanner();

    function getBanner() {
        var params = {
            url: 'banner/1',
            type: 'get',
            sCallback: function (res) {
                console.log(res);
                var data = res.items;
                for(var i=0; i<4; i++){
                    // console.log(data[i]['img']['url']);
                    // console.log('#img'+i);
                    $('#img'+i).attr('src', data[i]['img']['url']);
                }
                // var str = mixBanner(res);
                // console.log(str);
                // $('.am-slides').append(str);

            },
            eCallback: function (e) {

            },
        };

        window.base.getData(params);
    }

    function mixBanner(data) {
        var bannerData = data['items'];
        console.log(bannerData);

        var str = "";
        for(var i in bannerData){
            str += "<li class='banner'><a href=''><img src='" + bannerData[i].img.url + "'/></a></li>";
        }
        return str;
    }
});