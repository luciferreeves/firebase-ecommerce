$(document).ready(function(){
    $('#cart').click(function(){
        window.location.replace('../')
    })
    function showAlert(message) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        $('#snackbar').text(message)
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    $('#signout').click(function(){
        firebase.auth().signOut().then(function() {
            window.location.replace('../')
        }).catch(function(error) {
            showAlert("Failed to sign out")
        });
    })

    var user;

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
         window.location.replace('../')
        }
        user = firebase.auth().currentUser;

        console.log(user)

        //Checking if Cart is Empty 
    
        var cartRef = firebase.database().ref('userCart/' + user.uid);
        cartRef.on('value', function(snapshot) {
            if(snapshot.val() === null) {
                showEmptyCart();
            }
        });
        
    });

    
    


})