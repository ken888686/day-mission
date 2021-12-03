/*
1. 請同學在商品列表新增「加入購物車」按鈕，點擊按鈕可以新增一筆購物車項目 （預設數量為 1）
2. (加分題) 新增的購物車項目可以及時的渲染於上方列表
*/

const url = "https://livejs-api.hexschool.io/api/livejs/v1";
const apiPath = "ken888686";
const productUrl = `${url}/customer/${apiPath}/products`;
const cartUrl = `${url}/customer/${apiPath}/carts`;
const orderUrl = `${url}/customer/${apiPath}/orders`;
const products = [];
let carts = [];

// 渲染產品
const productList = document.querySelector(".productList");
function renderProducts() {
  let htmlStr = "";
  products.forEach((item) => {
    htmlStr += `
    <div class="col-6 mb-3">
      <div class="card h-100">
        <img src="${item.images}" class="card-img-top productImg" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title"><strong>標題:</strong>${item.title}</h5>
          <p class="card-text"><strong>種類:</strong>${item.category}</p>
          <p class="card-text"><strong>原始價格:</strong>${item.origin_price}</p>
          <p class="card-text"><strong>售價:</strong>${item.price}</p>
          <p class="card-text"><strong>描述:</strong>${item.description}</p>
          <button type="button" class="btn btn-primary" data-productid="${item.id}">加入購物車</button>
        </div>
      </div>
    </div>`;
  });
  productList.innerHTML = htmlStr;
  let buttons = document.querySelectorAll("button");
  buttons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      addToCart(e.target.dataset.productid);
    });
  });
}

// 渲染購物車
const cartList = document.querySelector(".cartList");
function renderCarts() {
  let htmlStr = "";
  carts.forEach((item) => {
    htmlStr += `
    <li>
      <p>名稱: <span>${item.product.title}</span></p>
      <p>數量: <span>${item.quantity}</span></p>
    </li>
    `;
  });
  cartList.innerHTML = htmlStr;
}

// 取得產品列表
function getProducts() {
  axios.get(productUrl).then((res) => {
    products.push(...res.data.products);
    renderProducts();
  });
}

// 取得購物車
function getCarts() {
  axios.get(cartUrl).then((res) => {
    carts = [...res.data.carts];
    renderCarts();
  });
}

// 加入購物車
function addToCart(productId) {
  axios
    .post(cartUrl, {
      data: {
        productId: productId,
        quantity: 1,
      },
    })
    .then((res) => {
      carts = [...res.data.carts];
      renderCarts();
    });
}

// 送出訂單
function submitOrder(data) {
  axios.post(orderUrl, data).then((res) => {
    carts = [];
    renderCarts();
  });
}

var constraints = {
  姓名: {
    presence: {
      message: "必填欄位",
    },
  },
  電話: {
    presence: {
      message: "必填欄位",
    },
    length: {
      minimum: 9,
      message: "號碼需超過 9 碼",
    },
  },
  信箱: {
    presence: {
      message: "必填欄位",
    },
    email: {
      message: "格式不正確",
    },
  },
  地址: {
    presence: {
      message: "必填欄位",
    },
  },
};
const form = document.querySelector(".submitForm");
const inputs = document.querySelectorAll("input[type=text],input[type=tel]");
const dataMsg = document.querySelectorAll("[data-msg]");
form.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    const errorMsg = validate(form, constraints);
    if (errorMsg) {
      showErrorsMsg(errorMsg);
    } else {
      const data = {
        data: {
          user: {
            name: document.querySelector("#customerName").value.trim(),
            tel: document.querySelector("#customerTel").value.trim(),
            email: document.querySelector("#customerEmail").value.trim(),
            address: document.querySelector("#customerAddress").value.trim(),
            payment: document.querySelector("#payMethod").value.trim(),
          },
        },
      };
      console.log(data);
      // submitOrder(data);
    }
  },
  false
);

function showErrorsMsg(msgs) {
  dataMsg.forEach((item) => {
    item.textContent = msgs[item.dataset.msg];
  });
}

inputs.forEach((item) => {
  item.addEventListener("change", function (e) {
    e.preventDefault();
    let targetName = item.name;
    let errors = validate(form, constraints);
    item.nextElementSibling.textContent = "";
    if (errors) {
      document.querySelector(`[data-msg='${targetName}']`).textContent =
        errors[targetName];
    }
  });
});

getCarts();
getProducts();
