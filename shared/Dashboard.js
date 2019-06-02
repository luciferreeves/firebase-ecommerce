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
        $.getJSON("../products.json", function(result){
            $('#loader').append('<div class="productDetail"><div class="picture" style="background-image: url('+')"></div><div class="content"><h1>Title</h1><ul><li>Point 1</li><li>Point 2</li><li>Point 3</li><li>Point 4</li></ul><h3>$17.99</h3><button>Add to Cart</button></div></div>')
        })
    }
    function showErrorDiv() {

    }
    function loadAllProducts() {
        $.getJSON("../products.json", function(result){
            console.log(result)
            var size = (Object.keys(result).length)
            for(i = 0; i < size ; i++)
            {
                $('#loader').append('<div class="singleProduct"><div class="productImage" style="background-image: url(\''+result[i].ProductImageURL+'\');"></div><h3 class="productTitle">'+result[i].productName+'</h3><h5 class="productPrice">$'+result[i].productPrice+'</h5><a href="index.html?productid='+result[i].productId+'">View Product</a></div>')
            }
        });
    }
})