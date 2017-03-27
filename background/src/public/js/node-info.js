$(function() {
	
});
function sendKeyValue() {
    var key ="", value=""
    var url = "upload/"+key+"/"+value
    $.get(url , function( data ) {
        $( ".result" ).html( data );
        alert( "Load was performed." );
    });
}