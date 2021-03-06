//购物车
$(function () {
    shopCar();

    function shopCar() {
        shop = localStorage.getItem('shop');
        shop = JSON.parse(shop);
        console.log(shop);
        var str = mix(shop);
        $("#showShopCar").append(str);

    }

    /**
     * 生成html 页面
     * @param data
     * @returns {string}
     */
    function mix(data) {
        var str = '';
        for(var i in data){
            str +=
                "<ul class='item-content clearfix'>" +
                "<li class='td td-chk'>" +
                "<div class='cart-checkbox '>" +
                "<input class='check' id='J_CheckBox_170769542747' name='checkbox' hello="+ data[i].price +" count = "+ data[i].count +" value="+ data[i].id +" type='checkbox'>" +
                "<label for='J_CheckBox_170769542747'></label>" +
                "</div>" +
                "</li>" +
                "<li class='td td-item'>" +
                "<div class='item-pic'>" +
                "<a href='#' target='_blank' data-title='美康粉黛醉美东方唇膏口红正品 持久保湿滋润防水不掉色护唇彩妆' class='J_MakePoint' data-point='tbcart.8.12'>" +
                "<img style='height: 80px;width: 80px;' src="+ data[i].main_img_url +"></a>" +
                "</div>" +
                "<div class='item-info'>" +
                "<div class='item-basic-info'>" +
                "<a href='#' target='_blank' title='美康粉黛醉美唇膏 持久保湿滋润防水不掉色' class='item-title J_MakePoint' data-point='tbcart.8.11'>"+ data[i].name +"</a>" +
                "</div>" +
                "</div>" +
                "</li>" +
                "<li class='td td-info'>" +
                "<div class='item-props item-props-can'>" +
                "" +
                "<i class='theme-login am-icon-sort-desc'></i>" +
                "</div>" +
                "</li>" +
                "<li class='td td-price'>" +
                "<div class='item-price price-promo-promo'>" +
                "<div class='price-content'>" +
                "<div class='price-line'>" +
                "</div>" +
                "<div class='price-line'>" +
                "<em class='J_Price price-now' tabindex='0'> "+ data[i].price +"</em>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</li>" +
                "<li class='td td-amount'>" +
                "<div class='amount-wrapper '>" +
                "<div class='item-amount '>" +
                "<div class='sl'>" +
                "<input class='min am-btn' name='' type='button' value='-' />" +
                "<input class='text_box' name='' id='count' type='text' value="+ data[i].count +" style='width:30px;' />" +
                "<input class='add am-btn' name='' type='button' value='+' />" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</li>" +
                "<li class='td td-sum'>" +
                "<div class='td-inner'>" +
                "<em tabindex='0' class='J_ItemSum number'>117.00</em>" +
                "</div>" +
                "</li>" +
                "<li class='td td-op'>" +
                "<div class='td-inner'>" +
                "<a title='移入收藏夹' class='btn-fav' href='#'>" +
                "移入收藏夹</a>" +
                "<a href='javascript:;' data-point-url='#' class='delete'>" +
                "<span class='del' id='"+ data[i]['name'] +"' >删除</span></a>" +
                "</div>" +
                "</li>" +
                "</ul>";
        }
        return str;
    }

    //点击删除商品
    $('.del').click(function (e) {
        var name = $(e.target).attr('id');
        alert(name);
        delete shop[name];
        localStorage.setItem('shop', JSON.stringify(shop));
        window.location.reload();
    });

    /**
     * 点击结算按钮
     */
    $('#J_Go').on('click',function () {

        var ids = [];
        $('input[name="checkbox"]').each(function () {
            if($(this).is(':checked')){
                var id = $(this).val();
                ids.push(id);
            }
        })

        if(ids.length == 0){
            return false;
        }
        localStorage.setItem('ids', JSON.stringify(ids));
    });

    /**
     * 点击选中所有复选框
     */
    $('input[name="checkall"]').on("click",function(){
        if($(this).is(':checked')){
            $('input[name="checkbox"]').each(function(){
                $(this).prop("checked",true);
            });

            var all = getAllPrice();
            $('#J_Total').text(all);

        }else{
            $('input[name="checkbox"]').each(function(){
                $(this).prop("checked",false);
                $('#J_Total').text(0);
            });
        }
    });

    /**
     * 点击复选框计算总价格
     */
    $('input[name="checkbox"]').on('click', function () {
        var price = $(this).attr('hello');
        var allPrice = $('#J_Total').text();

        if ($(this).is(':checked')) {
            var count = $(this).attr('count');
            allPrice = parseInt(allPrice * 100) + parseInt(price * 100) * count;
        } else {
            var count = $(this).attr('count');
            allPrice = parseInt(allPrice * 100) - parseInt(price * 100) * count;
        }

        allPrice = allPrice / 100;
        $('#J_Total').text(allPrice);

    });

    /**
     * 生成全选复选框总价格
     * @returns {number}
     */
    function getAllPrice() {
        var allPrice = 0;

        for(var i in shop){
            allPrice += parseInt(shop[i]['price'] * 100) * shop[i]['count'];
        }
        allPrice = allPrice / 100;
        return allPrice;
    }

});