$(document).ready( function() {
    var email = $('input[name=id]');
    var mdp = $('input[name=password]');
    var bouton = $('#login');
    function viewPassword () {
        if ($("#checkbox").prop ("checked")) {
            mdp.attr ('type', 'text');
            mdp2.attr ('type', 'text');
        }
        else {
            mdp.attr ('type','password');
            mdp2.attr ('type','password');
        }
    }
    function emailChange () {
        const str = email.val();
        console.log(`${str} ${str.length}`)
        if(email.val().length > 4) {
            email.prev ().css ({"border":"none"});
        } else {
            email.prev ().css ({"border":"2px solid #e74c3c"});
        }
    }
    $("#checkbox").change(viewPassword);
    email.change(emailChange)
});