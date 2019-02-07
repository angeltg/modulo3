class Profesor {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  soyelprofe() {
    console.log("Soy el profesor " + this.nombre);
  }
  get edadminima() {
    return 12;
  }
  get edad() {
    return this._edad;
  }

  set edad(value) {
    if (value < this.edadminima) {
      console.log(
        "No tienes la edad mínima para ser profesor. Tienes que tenere como mínimo " +
          this.edadminima
      );
      return;
    }
    this._edad = value;
  }
}

let profesor1 = new Profesor("David Seoane", 5);

profesor1.soyelprofe();

console.log(profesor1.edadminima);
console.log(profesor1.edad);

profesor1.edad = 25;
