$(function() {
    $('#upload-btn').click(function() {
        var key = $('input[name=uploadkey]').val()
        var value = $('input[name=uploadvalue]').val()
        var url = "/upload/"+key+"/"+value
        getReq(url, (resp) => {
            alert( "Load was performed." );
        })
    });

     $('#bulk-upload-btn').click(function() {
        
        var keys = $('input[name=uploadnumber]').val()
        var url = "/upload/"+keys
        getReq(url, (resp) => {
            alert( "bulk Load was performed." );
        })
    });

    $('a[name=addRingBtn]').click(function() {
        var ip = $(this).siblings('input[type=hidden]').val()
        var url = "/elastic/add/"+ip
        getReq(url, (resp) => {
            alert('Node add request sent')
        })
    })

    $('a[name=removeRingBtn]').click(function() {
        var ip = $(this).siblings('input[type=hidden]').val()
        var url = "/elastic/remove/"+ip
        getReq(url, (resp) => {
            alert('Node remove request sent')
        })
    })
});
var getReq = function(url, callback) {
    $.get({
        url : url,
        success : callback
    });
}