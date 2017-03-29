$(function() {
    $('#upload-btn').click(function() {
        var key = $('input[name=uploadkey]').val()
        var value = $('input[name=uploadvalue]').val()
        var url = "/upload/"+key+"/"+value
        // a sample AJAX request
        $.get({
            url : url,
            success : function(response) {
                 alert( "Load was performed." );
            }
        });
    });

     $('#bulk-upload-btn').click(function() {
        
        var keys = $('input[name=uploadnumber]').val()
        var url = "/upload/"+keys
        // a sample AJAX request
        $.get({
            url : url,
            success : function(response) {
                 alert( "bulk Load was performed." );
            }
        });
    });
});