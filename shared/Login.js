$(document).ready(function(){
    function showAlert(message) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        $('#snackbar').text(message)
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
    $('#login').click(function(){
        var email = $("#email").val()
        var password = $("#password").val()
        if(email === '' || password === '') {
            showAlert('Please fill in all the fields')
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                showAlert(errorMessage)
                // ...
            });
        }
    })
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         window.location.replace('../dashboard')
        }
        else {
            showAlert("Failed to sign in. Try again.")
        }
    });
})