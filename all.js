/*
1. 請同學在商品列表新增「加入購物車」按鈕，點擊按鈕可以新增一筆購物車項目 （預設數量為 1）
2. (加分題) 新增的購物車項目可以及時的渲染於上方列表
*/

const url = "https://livejs-api.hexschool.io/api/livejs/v1";
const apiPath = "ken888686";
const productUrl = `${url}/customer/${apiPath}/products`;
const products = [];

// 渲染產品
const productList = document.querySelector(".productList");
function renderProducts() {
  let htmlStr = "";
  products.forEach((item) => {
    htmlStr += `
    <div class="col-6 mb-3">
      <div class="card h-100">
        <img src="${item.images}" class="card-img-top productImg" alt="產品圖片">
        <div class="card-body">
          <h5 class="card-title"><strong>標題:</strong>${item.title}</h5>
          <p class="card-text"><strong>種類:</strong>${item.category}</p>
          <p class="card-text"><strong>原始價格:</strong>${item.origin_price}</p>
          <p class="card-text"><strong>售價:</strong>${item.price}</p>
          <p class="card-text"><strong>描述:</strong>${item.description}</p>
          <button type="button" class="btn btn-primary">加入購物車</button>
        </div>
      </div>
    </div>`;
  });
  productList.innerHTML = htmlStr;
}

// 取得產品列表
function getProducts() {
  axios.get(productUrl).then((res) => {
    products.push(...res.data.products);
    renderProducts();
  });
}

getProducts();
