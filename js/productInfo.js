$(function () {

/*    id: 1
    img_id: 13
    main_img_url: "http://www.pokemon.com/images/product-vg@1.png"
    name: "芹菜 半斤"
    price: "0.01"*/

    getProductInfo();

    $('#add,#min').click(function () {
        count = Number($('#text_box').val());
        price = Number(productInfoData.price * count);

        $('#price1').html(price);
    });


    /**
     * 商品加入购物车
     */
    $('#shopCar').click(function () {
        // 缓存中有购物车数据，和没有数据
        // 没有数据就新增加，有数据就比对当前数据，
        // 比对当前数据, 如果当前商品在缓存中有就在原缓存增加数据，如果没有就在缓存中增加新数据
        // window.base.deleteLocalStorage('shop');

        var shop = localStorage.getItem('shop');
        var shop = JSON.parse(shop);

        var haveShopCache = null;
        //如果有缓存
        if(shop){
            for(var i in shop){
                if (shop[i]['id'] == productInfoData['id']) {
                    haveShopCache = 1;
                    var cacheCount = Number(shop[i]['count']);
                    break;
                }
            }
        }else{
            shop = {};
        }

        if (haveShopCache == 1) {
            shopData = {
                id: productInfoData.id,
                img_id: productInfoData.img_id,
                main_img_url: productInfoData.main_img_url,
                name:productInfoData.name,
                count: cacheCount + count,
            };
        } else {
            count = Number($('#text_box').val());

            console.log(count);
            shopData = {
                'id': productInfoData.id,
                'img_id': productInfoData.img_id,
                'main_img_url': productInfoData.main_img_url,
                'name': productInfoData.name,
                'count': count,
            };
        }

        shop[productInfoData.name] = shopData;
        shop[productInfoData.name]['price'] = productInfoData.price;

        console.log(shop);
        localStorage.setItem('shop',JSON.stringify(shop));
    });


    /**
     * 获得商品详细信息
     */
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