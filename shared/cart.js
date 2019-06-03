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

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
         window.location.replace('../')
        }

        loadCart(user);

    });

    function loadCart(user) {
        var user = user
        var cartRef = firebase.database().ref('userCart/' + user.uid);
        cartRef.on('value', function(snapshot) {
            if(snapshot.val() === null) {
                showEmptyCart();
            }
            else {
                var totalPrice = 0;
                $('#loader').empty();
                $("#loader").append('<tr><th>Item</th><th>Price</th><th>Options</th></tr>')
                for(i = 0; i < Object.keys(snapshot.val()).length; i++) {
                    // console.log(Object.values(snapshot.val())[i]);
                    totalPrice += parseFloat(Object.values(snapshot.val())[i].price);
                    $("#loader").append('<tr><td>'+Object.values(snapshot.val())[i].name+'</td><td>$'+Object.values(snapshot.val())[i].price+'</td><td><button class="delClick" id="'+Object.keys(snapshot.val())[i]+'">Delete</button></td></tr>')
                }
                $("#loader").append('<tr><th>Total Price</th><th colspan = "2">$'+totalPrice+'</th></tr>')
            }
            $('.delClick').on('click', function(event){
                event.preventDefault();
                var id = ($(this).attr('id'))
                var cartRef = firebase.database().ref('userCart/' + user.uid + '/' + id)
                cartRef.remove();
                loadCart(user);
                showAlert("Product Deleted")
            })
        })
    }

    function showEmptyCart() {
        $('#loader').html('<h1>Your Cart is Empty</h1><p>Click <a href="../">here</a> to shop for some products.</p>');
        showAlert('Your cart is empty. Go add something.')
    }
        
})