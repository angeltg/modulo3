// Poliformía

class Poligono {
  constructor(name, numlados) {
    this.name = name;
    this.numlados = numlados;
  }

  getarea() {
    return "No es posible calcular el area";
  }
}

class Triangulo extends Poligono {
  constructor(base, altura) {
    super("Triangulo", 3);
    this.base = base;
    this.altura = altura;
  }
  getarea() {
    return (this.base * this.altura) / 2;
  }
}

class Circulo extends Poligono {
  constructor(radio) {
    super("Circulo", 1);
    this.radio = radio;
  }
  getarea() {
    return Math.PI * this.radio * this.radio;
  }
}

class Paralepipedo extends Poligono {
  constructor(lado1, lado2) {
    super("Paralepipedo", 4);
    this.lado1 = lado1;
    this.lado2 = lado2;
  }
  getarea() {
    return this.lado1 * this.lado2;
  }
}

class Cuadrado extends Paralepipedo {
  constructor(lado) {
    super(lado, lado);
    this.name = "Cuadrado";
  }
}

let cuadrado = new Cuadrado(10);
let paralepipedo = new Paralepipedo(7, 5);
let circulo = new Circulo(3);
let triangulo = new Triangulo(10, 10);
let poligono = new Poligono("Poligono", 4);

console.log(cuadrado, paralepipedo, circulo, triangulo, poligono);
console.log(triangulo.getarea());
console.log(cuadrado.getarea());
console.log(circulo.getarea());
console.log(paralepipedo.getarea());
console.log(poligono.getarea());
