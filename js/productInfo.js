$(function () {

/*    id: 1
    img_id: 13
    main_img_url: "http://www.pokemon.com/images/product-vg@1.png"
    name: "芹菜 半斤"
    price: "0.01"*/

    getProductInfo();

    $('#add,#min').click(function () {
        var count = $('#text_box').val();
        var totalPrice = productInfoData.price * count;
        $('#price1').html(totalPrice);
    });



    // var privArr = [];
    // privArr['staProjQueryGrid'] = [{
    //     btn_id : 'but_add',
    //     roles : ['2001','2005']
    // }]

    $('#shopCar').click(function () {
        //window.base.deleteLocalStorage('shopCar');
        var shopcar = localStorage.getItem('shopCar');
        var shopCache = JSON.parse(shopcar);

        var price = Number($('#price1').text());
        var count = Number($('#text_box').val());


        var shopCarArr = [];

        //判断缓存中是否有购物车信息
        if (shopCache) {
            var cachePrice = Number(shopCache.price);
            var cacheCount = Number(shopCache.count);

            if (shopCache.id == productInfoData.id) {

                shopCarArr[productInfoData.id] = [{
                    id: productInfoData.id,
                    img_id: productInfoData.img_id,
                    main_img_url: productInfoData.main_img_url,
                    price: (parseInt(cachePrice * 100) + parseInt(price * 100))/100,
                    count: cacheCount + count,
                }];
                
                console.log(price);
                console.log(cachePrice);
            } else {

            }
        } else {
            //增加新的缓存
            shopCarArr[productInfoData.id] = [{
                id: productInfoData.id,
                img_id: productInfoData.img_id,
                main_img_url: productInfoData.main_img_url,
                price: price,
                count: count,
            }];

        }
/*
        localStorage.setItem('shopCar', JSON.stringify(data));
        var shopcar= localStorage.getItem('shopCar');*/

        console.log(shopCarArr);
    });






    function getProductInfo() {
        var str = GetQueryString('id');
        console.log(str);
        var params = {
            url:'product/'+ str,
            type:'get',
            sCallback:function (res) {
                productInfoData = res;
                console.log(res);
                attrProductInfo(res);

            },
            eCallback:function (e) {
                console.log();
            }
        };
        window.base.getData(params);
    }

    function attrProductInfo(res) {
        if(res.id){
            $('#img').attr('src',res.main_img_url);
            $("#name").append(res.name);
            $('#price').append(res.price);
            $('#img1').attr('src',res.main_img_url);
            $('#price1').append(res.price);
        }
    }

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