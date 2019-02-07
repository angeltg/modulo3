function Profesor(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

const profesor1 = new Profesor("Marcos", 44);
console.log(profesor1.nombre);
profesor1.nombre = "Marcos Javier";
Profesor.prototype.soyelprofesor = function() {
  console.log("Soy el profesor " + this.nombre);
};
profesor1.soyelprofesor();
const profesor2 = new Profesor("Pedro Alonso", 4);
profesor2.soyelprofesor();

Profesor.prototype.cumple = function() {
  console.log("Ahora tienes " + this.edad);

  console.log("Cumple un año y tiene " + ++this.edad + " años");
};
profesor1.cumple();
