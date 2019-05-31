$(document).ready(function(){
    $('#login').click(function(){
        var email = $("#email").val()
        var password = $("#password").val()
        if(email === '' || password === '') {
            alert('Please fill in all the fields')
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ...
            });
        }
    })
})