function getData() {
  let product_title = document.getElementById("title").value;
  let product_description = document.getElementById("description").value;
  let product_price = document.getElementById("price").value;
  let product_category = document.getElementById("category").value;
  let product_size = document.getElementById("size").value;
  let product_img = document.getElementById("image").files[0];
  let show_img = document.getElementById("showimg");
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
