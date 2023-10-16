function getData() {
  let product_title = document.getElementById("title").value;
  let product_description = document.getElementById("description").value;
  let product_price = document.getElementById("price").value;
  let product_category = document.getElementById("category").value;
  let product_size = document.getElementById("size").value;
  let product_img = document.getElementById("image").files[0];
  let show_img = document.getElementById("showimg");
  let product_stock = document.getElementById("stock").value;
  let image_data = "";
  let product_initial = JSON.parse(sessionStorage.getItem("product")) || [];
  let product = product_initial;
  if (product_img) {
    // Validate the file type if needed
    if (product_img.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        show_img.src = e.target.result;
        image_data = reader.result;
        product = [
          ...product,
          {
            title: product_title,
            description: product_description,
            price: product_price,
            category: product_category,
            size: product_size,
            img: image_data,
            stock: product_stock,
          },
        ];

        sessionStorage.setItem("product", JSON.stringify(product));
        console.log(product);

        document.getElementById("form").reset();
        document.getElementById("showimg").src = "images/img_placeholder.png";
      };
      reader.readAsDataURL(product_img);
    } else {
      alert("Please select an image file.");
    }
  } else {
    alert("Please select an image to upload.");
  }
}

function preview_image(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var show_img = document.getElementById("showimg");
    show_img.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function getProduct() {
  let products = JSON.parse(sessionStorage.getItem("product"));
  if (products) {
    console.log(products);
    let isCart = sessionStorage.getItem("cart");
    cart_no[0].innerHTML = isCart ? "1" : "0";
    cart_no[1].innerHTML = isCart ? "1" : "0";
    let quantity = "1";
    let title = document.getElementById("product_title");
    let description = document.getElementById("product_des");
    let price = document.getElementById("product_price");
    let total_price = document.getElementById("total_price");
    let stock = document.getElementById("left");

    title.innerHTML = products[0].title;
    price.innerHTML = "₹ " + products[0].price;

    stock.innerHTML = products[0].stock + " Items left";

    if (products[0].description.length >= 50) {
      products[0].description = products[0].description.substr(0, 90) + "....";
    }

    description.innerHTML = products[0].description;
    console.log(products[0].price * quantity);
    total_price.innerHTML = "₹ " + products[0].price * quantity;
    document.getElementById("product_img").src = products[0].img;
  } else {
    let hidden = document.getElementsByClassName("productcard")[0];

    let hidden_text = document.getElementById("hidden_text");
    hidden.style.display = "none";
    hidden_text.style.display = "block";
  }
  // document.getElementById("total_price").innerHTML =
}

function increment() {
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  let products = JSON.parse(sessionStorage.getItem("product"));
  let stock = document.getElementById("left");
  let total_price = document.getElementById("total_price");

  let available = products[0].stock;
  if (quantity < available) {
    quantity++;
    stock.innerHTML = available + " Items left";
    total_price.innerHTML = "₹ " + products[0].price * quantity;
    document.getElementById("quantity").innerHTML = quantity;
  } else {
    let error = document.getElementById("error");
    error.style.display = "block";
  }
}

function decrement() {
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  let products = JSON.parse(sessionStorage.getItem("product"));
  let total_price = document.getElementById("total_price");
  let available = products[0].stock;

  if (quantity != 1) {
    let error = document.getElementById("error");
    error.style.display = "none";
    quantity--;

    total_price.innerHTML = "₹ " + products[0].price * quantity;
    document.getElementById("quantity").innerHTML = quantity;
  }
}

function addCart() {
  let products = JSON.parse(sessionStorage.getItem("product"));
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  let total_price = document.getElementById("total_price").innerHTML;

  total_price = parseInt(total_price.split(" ")[1]);
  let product_cart = {
    title: products[0].title,
    price: parseInt(products[0].price),
    quantity: quantity,
    amount: total_price,
    img: products[0].img,
    available: parseInt(products[0].stock),
  };
  sessionStorage.setItem("cart", JSON.stringify(product_cart));
  let cart_no = document.getElementsByClassName("cart_no");
  let isCart = sessionStorage.getItem("cart");
  cart_no[0].innerHTML = isCart ? "1" : "0";
  cart_no[1].innerHTML = isCart ? "1" : "0";
}

function getCartProduct() {
  let products = JSON.parse(sessionStorage.getItem("cart"));
  if (products) {
    let isCart = sessionStorage.getItem("cart");
    cart_no[0].innerHTML = isCart ? "1" : "0";
    cart_no[1].innerHTML = isCart ? "1" : "0";
    let title = document.getElementById("product_title");
    let image = document.getElementById("img");
    let price = document.getElementById("product_price");
    let total_price = document.getElementById("total_price");
    let quantity = products.quantity;
    let cart_total = document.getElementById("cart_total");
    let cart_tax = document.getElementById("tax");
    let del = document.getElementById("del");
    let grand_total = document.getElementById("grand_total");
    let quantity_count = document.getElementById("quantity");

    quantity_count.innerHTML = products.quantity;

    console.log(products);
    image.src = products.img;
    title.innerHTML = products.title;
    price.innerHTML = "₹ " + products.price;
    total_price.innerHTML = "₹ " + products.price * quantity;
    cart_total.innerHTML = "₹ " + products.price * quantity;
    let tax = (products.price * quantity) / 100;
    cart_tax.innerHTML = "₹ " + tax;
    del.innerHTML = "₹ " + 100;
    let final_price = products.price * quantity + tax + 100;
    grand_total.innerHTML = "₹ " + final_price;
  } else {
    let hidden = document.getElementsByClassName("cart_container")[0];
    hidden.style.display = "none";
    let hidden_total = document.getElementsByClassName("total_container")[0];
    hidden_total.style.display = "none";
    let show_text = document.getElementById("hidden_text_cart");
    show_text.style.display = "block";
  }
}

function cartincrement() {
  let products = JSON.parse(sessionStorage.getItem("cart"));
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  let total_price = document.getElementById("total_price");

  let available = products.available;
  if (quantity < available) {
    quantity++;
    console.log(quantity);
    total_price.innerHTML = "₹ " + products.price * quantity;
    document.getElementById("quantity").innerHTML = quantity;

    products = { ...products, quantity: quantity };
    sessionStorage.setItem("cart", JSON.stringify(products));
    getCartProduct();
  } else {
    let error = document.getElementById("error");
    error.style.display = "block";
  }
}

function cartdecrement() {
  let products = JSON.parse(sessionStorage.getItem("cart"));
  let quantity = parseInt(document.getElementById("quantity").innerHTML);
  let total_price = document.getElementById("total_price");

  let available = products.available;
  if (quantity != 1) {
    quantity--;
    console.log(quantity);
    total_price.innerHTML = "₹ " + products.price * quantity;
    document.getElementById("quantity").innerHTML = quantity;

    products = { ...products, quantity: quantity };
    sessionStorage.setItem("cart", JSON.stringify(products));
    getCartProduct();
  } else {
    let error = document.getElementById("error");
    error.style.display = "block";
  }
}

function removeItem() {
  sessionStorage.removeItem("cart");
  getCartProduct();
}
