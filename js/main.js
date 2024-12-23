let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// Get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}
// Create Product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.addEventListener("click", function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // Count
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct; // Update
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  // Save on Local Storage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
});

// Clear Inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
              <td>${i + 1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onClick="updateData(${i})" id="update">Update</button></td>
              <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("delete-all");
  if (dataProduct.length > 0) {
    deleteAll.innerHTML = `
    <button onClick="deleteAll()">Delete All (${dataProduct.length})</button>
    `;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// Delete
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// Update
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "search-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search by " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function search(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
              <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onClick="updateData(${i})" id="update">Update</button></td>
                <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
              </tr>
      `;
      }
    } else {
      if (dataProduct[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
              <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onClick="updateData(${i})" id="update">Update</button></td>
                <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
              </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// Clean Data
