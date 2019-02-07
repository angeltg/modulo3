class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Book extends Producto {
  constructor(nombre, precio, autor) {
    super(nombre, precio);
    this.autor = autor;
  }
}

class Basket {
  constructor() {
    this.products = [];
  }

  addProduct(amount, product) {
    //añade el número de elementos dentro del array
    this.products.push(...Array(amount).fill(product));
  }
  calcTotal() {
    return this.products
      .map(product => product.precio)
      .reduce((a, b) => a + b, 0);
  }
  printShoppingProducts() {
    this.products.forEach(element => {
      console.log(element.nombre + " " + element.precio);
    });
  }
  printShoppingInfo() {
    console.log("El total es: " + this.calcTotal());
  }
}

let pan1 = new Producto("Barra", 1);
let agua = new Producto("Botella agua", 1.5);
let libro1 = new Book("El quijote", 15, "Cervantes");
let cesta1 = new Basket();

cesta1.addProduct(2, pan1);
cesta1.addProduct(5, agua);
cesta1.addProduct(1, libro1);

cesta1.printShoppingProducts();
cesta1.printShoppingInfo();
