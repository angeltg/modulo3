class Cuenta {
  constructor(nombre, banco) {
    this.nombre = nombre;
    this.banco = banco;
    this._saldo = 0;
  }
  get saldo() {
    return this._saldo;
  }
  set saldo(importe) {
    this._saldo = importe;
  }
}
class Cuentaempresa extends Cuenta {
  constructor(nombre, banco, saldo) {
    super(nombre, banco, saldo);
    this.tipo = "Empresa";

    this.comision = 0.01;
  }
}
class Cuentaprivada extends Cuenta {
  constructor(nombre, banco, saldo) {
    super(nombre, banco, saldo);
    this.tipo = "Privada";
    this.comision = 0.02;
  }
}

class Transaccion {
  constructor(remitente, receptor, cantidad, referencia, comision) {
    this.remitente = remitente;
    this.receptor = receptor;
    this.cantidad = cantidad;
    this.referencia = referencia;
    this.comision = comision;
  }
}
class Librotransaccion {
  constructor(bankAccount) {
    this.registro = [];
    this.bankAccount = bankAccount;
  }
  addTransaccion(
    remitente = new Cuenta("caja", "Efectivo"),
    receptor,
    cantidad,
    referencia
  ) {
    // remitente.subSaldo = cantidad - remitente.comision;
    // receptor.addSaldo = cantidad;
    this.registro.push(
      new Transaccion(
        remitente.nombre,
        receptor.nombre,
        cantidad,
        referencia,
        remitente.comision
      )
    );
  }
  //Calcula el total del saldo según el registro de transferencias.
  calculaAmountForAccount(cuenta) {
    return this.registro
      .map(entrada => entrada)
      .reduce(function(contador, cuentaentrada) {
        // Recorremos el map de registros bancarios para sumar al receptor y restar al emisor partiendo de su saldo.
        if (cuentaentrada.receptor == cuenta.nombre) {
          // console.log("sumo");
          contador = contador + cuentaentrada.cantidad;
        } else {
          if (cuentaentrada.remitente == cuenta.nombre) {
            contador =
              contador - cuentaentrada.cantidad - cuentaentrada.comision;
            // console.log("resto");
          }
        }
        return contador;
      }, cuenta.saldo);
  }

  // Cacula el número de transacciones realizadas para cada cuenta
  findTransactionsForAccount(cuenta) {
    return this.registro
      .map(entrada => entrada)
      .filter(function(entrada) {
        if (
          entrada.receptor == cuenta.nombre ||
          entrada.remitente == cuenta.nombre
        ) {
          return entrada.referencia;
        }
      });
  }
}

// Creo el banco y 2 cuentas
let elbanco = new Librotransaccion("BBVA");
let cuenta1 = new Cuentaempresa("cuenta1", elbanco.bankAccount);
let cuenta2 = new Cuentaprivada("cuenta2", elbanco.bankAccount);

// Esta función lista un array por consola
listarElementos(elbanco.findTransactionsForAccount(cuenta1));
function listarElementos(arr) {
  arr.forEach(element => {
    console.log(element);
  });
}

console.log(elbanco);
console.log(cuenta1);
console.log(cuenta2);
// realizamos 3 transacciones Una por caja y las otras de cuenta a cuenta
elbanco.addTransaccion("", cuenta1, 1000, "refer");
elbanco.addTransaccion(cuenta1, cuenta2, 100, "refer");
elbanco.addTransaccion(cuenta2, cuenta1, 300, "refer");
//Listamos el registro total
listarElementos(elbanco.registro);
// actualizamos saldos de cuentas
cuenta1.saldo = elbanco.calculaAmountForAccount(cuenta1);
cuenta2.saldo = elbanco.calculaAmountForAccount(cuenta2);
// Listamos saldos de las cuentas
console.log(cuenta1);
console.log(cuenta2);

// Listamos las transacciones de la cuenta2
listarElementos(elbanco.findTransactionsForAccount(cuenta2));
