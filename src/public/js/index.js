const socketClient = io();

socketClient.on('productsList', (data)=>{
    updateProductList(data)
})

function updateProductList(data){
    let div = document.getElementById('productsList')
    let products = ''

    data.forEach((product) => {
        products += `
            <div class='container'>
                <div class='card'>
                    <div class='content'>
                        <h3>${product.title}</h3>
                        <div class='description'>
                            <h4>${product.description}</h4>
                            <p>Code: ${product.code}</p>
                            <p>Category: ${product.category}</p>
                        </div>
                        <div class='price'>
                            <h4>$${product.price}</h4>
                        </div>
                        <div class='id'>
                            <p>ID product: ${product._id}</p>
                        </div>
                        <a href='#'>Buy</a>
                    </div>
                </div>
            </div>
        `
    });
    div.innerHTML = products;
}

const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = addProductForm.elements.title.value;
    let description = addProductForm.elements.description.value;
    let code = addProductForm.elements.code.value;
    let price = addProductForm.elements.price.value;
    let stock = addProductForm.elements.stock.value;
    let category = addProductForm.elements.category.value;

    socketClient.emit('addProduct', {
        title,
        description,
        code,
        price,
        stock,
        category
});
    addProductForm.reset();
});

const deleteProductForm = document.getElementById('deleteProductForm');
deleteProductForm.addEventListener('submit', () => {
    const prodId = document.getElementById('prodId');
    const deleteid = prodId.value;
    socketClient.emit('deleteProduct', deleteid);
    prodId = '';
});