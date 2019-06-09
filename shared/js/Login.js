$(document).ready(function(){
    function showAlert(message, body) {
        $('#message').text(message);
        $('#body').text(body)
        $('.toast').toast('show')
    }
    $('#login').click(function(){
        $('#login').html('&emsp;<div class="spinner-grow spinner-grow-sm text-light" role="status"><span class="sr-only">Loading...</span></div>&emsp;');
        var email = $("#email").val()
        var password = $("#password").val()
        if(email === '' || password === '') {
            $('#login').html('Login')
            showAlert('Sign in Error', 'Email or Password empty. You need to fill in all the details to continue with login. Please fill in all details and retry.')
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                $('#login').html('Login')
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                showAlert('Sign in Error',errorMessage)
                // ...
            });
        }
    })
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         window.location.replace('../')
        }
    });
})