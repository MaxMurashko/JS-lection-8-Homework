function productsStorage(){
    let products = [];
    return {
        setProductsBackup : function(newProducts) {
            return products = newProducts;
        },
        getProductsBackup : function() {
            return products;
        }
    }
}

const store = productsStorage();

function filterProducts(search) {
    const filteredProducts = store.getProductsBackup().filter(function(product){
        return product.title.toLowerCase().indexOf(search) >= 0 || product.catg.toLowerCase().indexOf(search) >= 0;
    });
    renderProducts(filteredProducts);
}

function renderProducts(products) {
    products.reduce(function(acc, product) {
        acc += `<div class="card col-lg-3 col-md-6 border-light">
        <img class="card-img-top mx-auto pt-3" src="${product.img}" alt="${product.title} image">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text font-weight-bold">category: ${product.catg}</p>
            <p class="card-text text-danger font-weight-bold">$${product.price}</p>
        </div>
        </div>`
        return document.querySelector("#products").innerHTML = acc;
    },'');
    
    const cards = document.getElementsByClassName("card")
    for(let item = 0; item < cards.length; item++) {
        let card = cards[item];
        card.onmouseenter = function(e) {
            e.currentTarget.classList.add("border-dark");
        }
        card.onmouseleave = function(e) {
            e.currentTarget.classList.remove("border-dark");
        }
    }
}

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(function(data) {
        const filteredData = data.map(function(el) {
            return {
                title: el.title,
                img: el.image,
                price: el.price,
                catg: el.category
            }
        });

    const selectCatg = `<select class="form-control">
        <option>All</option>
        ${filteredData.reduce(function (acc, el) {
            if (!acc.includes(el.catg)) {
                acc += `<option>${el.catg}</option>`;
            }
            return acc;
            }, "")}
        </select>`
        document.querySelector(".select-rd").innerHTML = selectCatg;

    store.setProductsBackup(filteredData);
    renderProducts(filteredData);
});

document.querySelector("#search").onkeyup = function(e) {
    const searchVal = e.currentTarget.value.trim().toLowerCase();
    filterProducts(searchVal);
}
