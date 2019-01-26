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
                    console.log(data[i]['img']['url']);
                    console.log('#img'+i);
                    $('#img'+i).attr('src', data[i]['img']['url']);
                }

            },
            eCallback: function (e) {

            },
        };

        window.base.getData(params);
    }
});