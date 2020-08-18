let carts = document.querySelectorAll ('.add-cart');

let products = [
    {
        name: 'T-Shirt',
        tag: 'T-Shirt',
        price: 50,
        inCart: 0
    },
    {
        name: 'Socks',
        tag: 'Socks',
        price: 5,
        inCart: 0
    },
    {
        name: 'PhoneProtection',
        tag: 'PhoneProtection',
        price: 15,
        inCart: 0
    },
    {
        name: 'Cup',
        tag: 'Cup',
        price: 12,
        inCart: 0
    },
];

for (let i= 0; i< carts.length; i++ ) {
    carts[i].addEventListener ('click', () => {
        cartNumbers (products[i]);
        totalCost (products[i])
    })
}

function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem ('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers ;

    }
}

function cartNumbers (products) {
    
    let productNumbers = localStorage.getItem ('cartNumbers');
    productNumbers= parseInt (productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(products);
}

function setItems (products) {
   let cartItems = localStorage.getItem ('productsInCart');
   cartItems = JSON.parse(cartItems);
   
    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
          [products.tag]: products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems ));
}

function totalCost (products) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log ("my cartcost is", cartCost);
    console.log(typeof cartCost );
    
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }


}

function displayCart () {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector 
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./res/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div> DT
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                ${item.inCart * item.price} DT
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    ${cartCost} DT
                </h4>
        `;
    }
}

onLoadCartNumbers ();
displayCart ();