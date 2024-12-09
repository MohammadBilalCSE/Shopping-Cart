let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'Product 1', images: '1.png', price: 200 },
    { id: 2, name: 'Product 2', images: '2.png', price: 100 },
    { id: 3, name: 'Product 3', images: '3.png', price: 99 },
    { id: 4, name: 'Product 4', images: '4.png', price: 129 },
    { id: 5, name: 'Product 5', images: '5.png', price: 559 },
    { id: 6, name: 'Product 6', images: '6.png', price: 700 },
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.images}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add to Cart</button>`;
        list.appendChild(newDiv);
    });
}

function addToCard(key) {
    if (listCards[key]) {
        listCards[key].quantity += 1;
    } else {
        listCards[key] = { ...products[key], quantity: 1 };
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.images}" alt="${value.name}"></div>
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}

// Expose functions globally
window.addToCard = addToCard;
window.changeQuantity = changeQuantity;

initApp();
