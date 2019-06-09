$(document).ready(function(){
    function showAlert(message, body) {
        $('#message').text(message);
        $('#body').text(body)
        $('.toast').toast('show')
    }
    $('#login').click(function(){
        var email = $("#email").val()
        var password = $("#password").val()
        if(email === '' || password === '') {
            showAlert('Error', 'Please fill in all the fields')
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                showAlert('Error',errorMessage)
                // ...
            });
        }
    })
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         window.location.replace('dashboard')
        }
    });
})