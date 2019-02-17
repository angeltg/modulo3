// // Creación de un generador de cuentas bancarias y clientes
// // 	Factoria:Banco
// // 	Clase:Cuenta, Clientes
// // Añadir un prototype de tipo de cuenta en el que se establezca el valor de la comisión por defecto.

// // Añadir a la clase Banco un evento EnviarPublicidad
// // subscribir al evento de lanzar publicidad a Varios clientes
// // funcion en cada cliente :leer publicidad

// // Crear un singleton que genere la misma instancia del banco (la factoría del punto 1)

// // La clase Cuenta tendrá:
// // 	-Objeto Cliente
// // 	-Objeto Banco
// // 	-Propiedad Saldo

// // La clase Cliente tendrá::
// // 	- Lista de Cuentas
// // 	- Función GetSaldoTotal
// // 	- Leer publicidad

// //  La clase banco
// // 	- Nombre
// // 	- Lista de cuentas
// // 	- Función LanzaarPublicidad (texto publicidad)
// // 	- Lista de clientes que aceptan publicidad (observer)

// class Banco {
//   constructor(nombre) {
//     this.nombre = nombre;
//     this.listaClientes = [];
//     this.listaCuentas = [];
//     this.listaPublicidad = [];
//     this.comisionesCunentaBase = { Bussines: 0.5, Privada: 0.2 };
//   }

//   asignarcomision(cuenta) {
//     cuenta.comision = this.comisionesCunentaBase[cuenta.type];
//   }
//   cambiarcomison(type, comision) {
//     this.comisionesCunentaBase[type] = comision;
//   }
//   crearClienteYOCuenta(type, cliente, nombreCliente) {
//     let cuenta;

//     if (!cliente) {
//       cliente = this.crearCliente(nombreCliente);
//     }
//     // Si el tipo es blanco creo la cuenta desde la cuenta por defecto
//     cuenta = this.crearCuenta(type, cliente);
//   }
//   crearCuenta(type, cliente) {
//     let cuenta;

//     if (!this.cuentaBase) {
//       cuenta = new Cuenta(type, cliente, this);
//       this.cuentaBase = cuenta;
//     } else {
//       cuenta = this.clonarCuenta(type, cliente);
//     }
//     this.asignarcomision(cuenta);
//     this.anadirCuentas(cuenta);

//     cliente.cuentas.push(cuenta);
//     return cuenta;
//   }

//   anadirCuentas(cuenta) {
//     if (this.listaCuentas.indexOf(cuenta) === -1) {
//       this.listaCuentas.push(cuenta);
//     }
//   }
//   anadirClinetes(cliente) {
//     if (this.listaClientes.indexOf(cliente) === -1) {
//       this.listaClientes.push(cliente);
//     }
//   }
//   anadirClinetesPublicidad(cliente) {
//     if (this.listaPublicidad.indexOf(cliente) === -1) {
//       this.listaPublicidad.push(cliente);
//     }
//   }
//   dessuscribirse(cliente) {
//     this.listaPublicidad = this.listaPublicidad.filter(function(item) {
//       if (item !== cliente) {
//         return item;
//       }
//     });
//   }

//   enviarpublicidad(texto) {
//     this.listaPublicidad.forEach(function(item) {
//       item.recibirPublicidad(texto);
//     });
//   }

//   clonarCuenta(type, cliente) {
//     let cuenta;
//     cuenta = this.clone(this.cuentaBase);

//     if (type != "") {
//       cuenta.type = type;
//     }
//     if (cliente) {
//       cuenta.cliente = cliente;
//     }

//     return cuenta;
//   }

//   crearCliente(nombre) {
//     let cliente;
//     cliente = new Cliente(nombre);
//     this.anadirClinetes(cliente);

//     return cliente;
//   }
//   clone(cuentaPorDefecto) {
//     let cuentanueva = new Cuenta();
//     cuentanueva.type = this.cuentaBase.type;
//     cuentanueva.saldo = this.cuentaBase.saldo;
//     cuentanueva.cliente = this.cuentaBase.cliente;
//     cuentanueva.banco = this.cuentaBase.banco;
//     return cuentanueva;
//   }
// }

// class Cuenta {
//   constructor(type, cliente, banco) {
//     this.type = type;
//     this.saldo = 0;
//     this.cliente = cliente;
//     this.banco = banco;
//     this._comision = 0;
//   }

//   get comision() {
//     return this._comision;
//   }

//   set comision(importe) {
//     this._comision = importe;
//   }
// }

// class Cliente {
//   constructor(nombre) {
//     this.nombre = nombre;
//     this.cuentas = [];
//   }
//   recibirPublicidad(texto) {
//     console.log("Yo " + this.nombre + " he recibido del banco " + texto);
//   }
// }

// // let clientes = [];
// let banco = new Banco("BBVA");
// // let cliente = banco.crearCliente("Caja");
// // let cuenta = banco.crearCuenta("Bussines", banco.listaClientes[0]);

// banco.crearClienteYOCuenta("Privada", "", "Manolo");
// banco.crearClienteYOCuenta("Bussines", "", "Pepe");
// banco.crearClienteYOCuenta("", "", "Rosario");

// banco.cambiarcomison("Bussines", 0.7);
// banco.crearClienteYOCuenta("Bussines", "", "Pepa");

// // banco.listaClientes[0].cuentas.push(banco.listaCuentas[0]);

// banco.listaClientes.forEach(element => {
//   console.log(element);
//   banco.anadirClinetesPublicidad(element);
// });
// banco.listaCuentas.forEach(element => {
//   console.log(element);
//   console.log(element.comision);
// });

// banco.dessuscribirse(banco.listaClientes[2]);

// console.log("LISTA DE CLIENTES SUSCRITOS A LA PUBLICIDAD");

// banco.listaPublicidad.forEach(element => {
//   element.nombre;
// });

// banco.enviarpublicidad(
//   "Existe una cuenta genial para sacarle partido a tu dinero"
// );
