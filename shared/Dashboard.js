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
    });
    // var url = window.location.href;
    // 
    
    var url = window.location.href;
    if( url.search( 'productid' ) > 0 ) {
        option = url.match(/productid=(.*)/)[1];
        $.getJSON("../products.json", function(result){
            var size = (Object.keys(result).length)
            if(option > -1 && option < size) {
                loadProduct(option);
            }
            else {
                showErrorDiv()
            }
        })
    }  else {
        loadAllProducts()
    }
    function loadProduct (productid) {
        $('#loader').empty();
        $.getJSON("../products.json", function(result){
            // console.log(result[productid])
            str = "";
            for(i=0; i< Object.keys(result[productid].productDescription).length; i++) {
                str += ('<li>' + result[productid].productDescription[i] + '</li>');
            }
            firebase.auth().onAuthStateChanged(function(user) {
                var cartRef = firebase.database().ref('userCart/' + user.uid + '/' + productid);
                cartRef.on('value', function(snapshot) {
                    // console.log(snapshot.val())
                    if(snapshot.val() != null) {
                        $('#loader').append('<div class="productDetail"><div class="picture" style="background-image:url(\''+result[productid].ProductImageURL+'\');"></div><div class="content"><h1>'+result[productid].productName+'</h1><ul>'+str+'</ul><h3>$'+result[productid].productPrice+'</h3><button class="clickAdd" disabled id="'+productid+'">Already in Cart</button></div></div>');
                    } else {
                        $('#loader').append('<div class="productDetail"><div class="picture" style="background-image:url(\''+result[productid].ProductImageURL+'\');"></div><div class="content"><h1>'+result[productid].productName+'</h1><ul>'+str+'</ul><h3>$'+result[productid].productPrice+'</h3><button class="clickAdd" id="'+productid+'">Add to Cart</button></div></div>');
                    }
                    $('.clickAdd').click(function(){
                        // console.log(productid)
                        var cartRef = firebase.database().ref('userCart/' + user.uid + '/' +  productid);
                        cartRef.set({
                            name : result[productid].productName,
                            price : result[productid].productPrice
                        })
                        $('#loader').empty();
                        $('#loader').append('<div class="productDetail"><div class="picture" style="background-image:url(\''+result[productid].ProductImageURL+'\');"></div><div class="content"><h1>'+result[productid].productName+'</h1><ul>'+str+'</ul><h3>$'+result[productid].productPrice+'</h3><button class="clickAdd" disabled id="'+productid+'">Already in Cart</button></div></div>');
                        showAlert("Product added in cart. You can view your cart and check out now.")
                    })
                });
            });
        })
    }
    function showErrorDiv() {
        $('#loader').empty();
        $('#loader').append('<h1>This product does not exist.</h1><p>Click <a href="../dashboard">here</a> to go home</p>');
    }
    function loadAllProducts() {
        $('#loader').empty();
        $.getJSON("../products.json", function(result){
            // console.log(result)
            var size = (Object.keys(result).length)
            for(i = 0; i < size ; i++)
            {
                $('#loader').append('<div class="singleProduct"><div class="productImage" style="background-image: url(\''+result[i].ProductImageURL+'\');"></div><h3 class="productTitle">'+result[i].productName+'</h3><h5 class="productPrice">$'+result[i].productPrice+'</h5><a href="index.html?productid='+result[i].productId+'">View Product</a></div>')
            }
        });
    }

    $('#cart').click(function(){
        window.location.replace('cart');
    })
})