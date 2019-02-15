$(function () {

    // tokenData = window.base.getLocalStorage('token');
    tokenData = 'b2ad4124cd5c08f6a330c310488ea8bd';

    getAddress();

    function address(data){
        console.log(data);
        var params = {
            'type':'post',
            'url' :'address',
            'data':data,
            'contentType': 'application/json',
            sCallback:function(res){
                console.log(res);
                window.history.back(-1);
            },
            eCallback:function(e){

            }
        }

        window.base.getData(params);
    }


    $('#save').click(function () {
        var arr = $("#add").serializeArray();

        var addressObj = {};
        $.each(arr, function (i,item) {
            var name = item['name'];
            addressObj[name] = item['value'];
        });

        addressObj['token'] = tokenData;
        var addressObj = JSON.stringify(addressObj).toString();
        address(addressObj);
    });



    function getAddress(){
        var params = {
            'type':'post',
            'url' :'getAddress',
            'data':{'token':tokenData},
            sCallback:function (res) {
                console.log(res);
                displayAddress(res);
            },
            eCallback:function (e) {

            }
        }
        window.base.getData(params);

    }

    function displayAddress(data){
        console.log(data.city);
        console.log(data.country);
        $('#user-name').val(data.name);
        $('#user-phone').val(data.mobile);
        $('#user-intro').text(data.detail);
        $('#province').val(data.province);
        $('#city').val(data.city);
        $('#country').val(data.country);
    }

});