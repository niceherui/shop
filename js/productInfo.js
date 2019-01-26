$(function () {

/*    id: 1
    img_id: 13
    main_img_url: "http://www.pokemon.com/images/product-vg@1.png"
    name: "芹菜 半斤"
    price: "0.01"*/
    $('#add,#min').click(function () {
        var count = $('#text_box').val();
        var totalPrice = productInfoData.price * count;
        $('#price1').html(totalPrice);
    });


    getProductInfo();

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
     * @param name
     * @returns {*}
     * @constructor
     */
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
});