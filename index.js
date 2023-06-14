import ProductManager from "./productManager/productManager.js";

const env = async () =>{

    const productManager = new ProductManager('./files/products.json')

    console.log("\n", "* Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []")
    console.log(await productManager.getProducts())

    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
    console.log("\n", "* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado")
    console.table(await productManager.getProducts())

    console.log("\n", "* Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.")
    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

    console.log("\n", "* Validar que todos los campos sean obligatorios")
    await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "", 76)
    await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen")
    await productManager.addProduct('producto prueba 2', 'Este es otro producto prueba', 100, 'Sin imagen', 'abc124', 20)

    console.log("\n", "* Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.")
    console.log(await productManager.getProductById(1));
    console.log(await productManager.getProductById(2));
    console.log(await productManager.getProductById(8));

    console.log("Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.")
    await productManager.updateProduct(2, "producto nuevo 2", "Otro producto prueba", 50, "Imagen", "def321", 62)
    console.table(await productManager.getProducts());

    console.log("Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.")
    await productManager.deleteProduct(1)
}

env()