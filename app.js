let dishes_wrapper = document.querySelector("#dishes");
let cart_count = document.querySelector("[data-cart-count]");
let cards = document.querySelectorAll(".card");
let nav_cart = document.querySelector("#nav-cart");
let cart_div = document.querySelector("#cart-div");
let cart_meal_div = document.querySelector("#cart-meals");
let amount_tip = document.querySelector("#amount-tip");
let cart_meal_card = document.querySelectorAll(".cart-meal-card");
let cart_header_total_amount = document.querySelector("#total-amount");
let cart_increament_btn = document.querySelector("increament-btn");
let add_to_cart_btn = document.querySelectorAll(".add-to-cart-btn");

/**
 * hcart_div.classList.toggle('cart-div-toggle')
 * .classList.toggle() helps toggle a class in, if not and out, if its in
 */

nav_cart.addEventListener("click", () => {
    cart_div.classList.toggle("cart-div-toggle");
});

let arr = [];

let number = 0;
cart_count.innerText = number;

window.onload = () => {
    getMeals();
};

/**
 * @getMeals
 * 👉 fetch the meals from the data.json and renders it to the main screen
 */

async function getMeals() {
    await fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((meal) => {
                dishes_wrapper.innerHTML += `<div class="card" id=${meal.id}>
                    <div class="demo-img-div" >${meal.image}</div>
                    <div class="meal-details">
                        <h4 class="meal-name">${meal.title}</h4>
                        <div>
                            <p class="meal-price">GHC${meal.price}</p>
                            <p class="delivery-time">${meal.delivery_time}mins</p>
                        </div>
                        <button class="add-to-cart-btn" id=${meal.id}>Add To Cart</button>
                    </div>
                </div>`;
            });
        })
        .catch((err) => console.log(`Error Happend ${err}`));

    addCard();
}

/**
 * @addCard
 * 👉 adds or remove a meal to the cart on onClick
 * 👉 changes the button text content as well as the class name, which helps
 *  change the style of the btn
 * 👉 this all add a count or subtract a count on a click of the btn
 *
 */

function addCard() {
    let add_to_btn = document.querySelectorAll(".add-to-cart-btn");
    add_to_btn.forEach((button) => {
        button.addEventListener("click", () => {
            let btn = button.id;
            if (button.innerText == "✔Check Out") {
                button.innerText = "Add To Cart";
                button.className = "add-to-cart-btn";
                changeCartCount(button.className);

                if (arr.includes(Number(btn))) {
                    // Removing Specific value of an array...................
                    let index = arr.indexOf(Number(btn));
                    arr.splice(index, 1);
                }
                cartData(btn);

                removeCartMealDiv(btn);
            } else {
                button.innerText = "✔Check Out";
                button.className = "checked-to-cart";
                changeCartCount(button.className);

                arr.push(Number(btn));

                cartData(btn);
                removeDisplayOnCartMealDiv(btn);
            }

            /**
             * let btn = button.id -1
             * -1 because i want to make it to start from zero(zero index)
             */

            //  cartData(button.innerText,btn)
        });
    });
}

/**
 *
 * @changeCartCount
 * 👉 this add and subtract 1 from the count
 * 👉 this also check if the count is 0 and returns it to above a negative number
 */

function changeCartCount(name) {
    switch (name) {
        case "checked-to-cart":
            number++;
            cart_count.innerText = number;
            break;
        case "add-to-cart-btn":
            number--;
            cart_count.innerText = number;
            break;
    }
}

/**
 *
 * @cartData
 * 👉 this fetches the meals from the data.json for the cart meals
 */

async function cartData(id) {
    await fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            let meal_id = data[id - 1];
            checkedMeals(meal_id);
        });
}

/**
 *
 * @checkMeals
 * 👉 this above duplication of meal on the cart
 * 👉 the gets the meal details from @cartData and passess it to @cartMealTemp
 */

async function checkedMeals(meal) {
    let myArr = [];
    myArr.push(meal);
    await myArr.forEach((el) => {
        for (let i = 0; i < cart_meal_div.childNodes.length; i++) {
            if (cart_meal_div.childNodes[i].id == el.id) {
                return;
            }
        }
        cartMealTemp(el);
    });
}

/**
 *
 * @cartMealTemp
 * 👉 this contains a template for rendering the cart meals
 */

function cartMealTemp(el) {
    cart_meal_div.innerHTML += `<div class="card" id=${el.id}>
        <div class="cart-meal-image " >${el.image}</div>
        <div class="meal-details">

            <div class="title_price" >
                <h4 class="cart-meal-name" >${el.title}</h4>
                <h6 class="cart-meal-price" >${el.price}</h6>
            </div>

            <div >
                <p class="text">Delivery Time</p>
                <p class="delivery-time">${el.delivery_time}mins</p>
            </div>
            
        </div>
    </div>`;
}

/**
 *
 * @removeCartMealDiv
 * 👉 this makes sure a meal is removed from the cart on onClick by appending a new
 * className to it
 */

function removeCartMealDiv(button) {
    for (let i = 0; i < cart_meal_div.childNodes.length; i++) {
        if (cart_meal_div.childNodes[i].id == button) {
            let mealDiv = cart_meal_div.childNodes[i];
            mealDiv.classList.add("disable");
        }
    }
}

/**
 *
 * @removeDisplayOnCartMealDiv
 * 👉 this removes the appended class for it to be visible ehen ther is a click for it to be
 * added to the cart
 *
 */

function removeDisplayOnCartMealDiv(button) {
    for (let i = 0; i < cart_meal_div.childNodes.length; i++) {
        if (cart_meal_div.childNodes[i].id == button) {
            let mealDiv = cart_meal_div.childNodes[i];
            mealDiv.classList.remove("disable");
        }
    }
}
