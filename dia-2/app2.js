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
  listarSaldo() {
    console.log(`El saldo de la cuenta ${this.nombre} es ${this.saldo}`);
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
class Caja extends Cuenta {
  constructor(nombre, banco, saldo) {
    super(nombre, banco, saldo);
    this.tipo = "Caja";
    this.comision = 0;
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

  // Esta transacción no genera una transacción a la cuenta del banco por la comisión
  addTransaccion(remitente, receptor, cantidad, referencia, cuentaComisiones) {
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
    // Si las comisiones son mayores de 0 generamos una nueva transacción por la comisión al banco
    if (remitente.comision > 0) {
      console.log("entro aqui");
      this.registro.push(
        new Transaccion(
          remitente.nombre,
          cuentaComisiones.nombre,
          remitente.comision,
          "Comisiones por " + referencia,
          0
        )
      );
    }
  }

  //Calcula el total del saldo según el registro de transferencias.
  calculaAmountForAccount(cuenta) {
    return (
      this.registro
        // .map(entrada => entrada)
        .reduce(function(contador, cuentaentrada) {
          // Recorremos el map de registros bancarios para sumar al receptor y restar al emisor partiendo de su saldo.
          if (cuentaentrada.receptor == cuenta.nombre) {
            // console.log("sumo");
            contador += cuentaentrada.cantidad;
          } else {
            if (cuentaentrada.remitente == cuenta.nombre) {
              // No hace falta restarle la comision ya que se genera una transacción para cada comisión
              contador -= cuentaentrada.cantidad;
              // console.log("resto");
            }
          }
          return contador;
        }, cuenta.saldo)
    );
  }

  // Cacula el número de transacciones realizadas para cada cuenta
  findTransactionsForAccount(cuenta) {
    return (
      this.registro
        // .map(entrada => entrada)
        .filter(function(entrada) {
          if (
            entrada.receptor == cuenta.nombre ||
            entrada.remitente == cuenta.nombre
          ) {
            return entrada.referencia;
          }
        })
    );
  }

  // Esta función lista un array por consola
  listarElementos(arr) {
    console.log("Listado de movimientos en la cuenta");
    arr.forEach(element => {
      console.log(element);
    });
  }
}

// Creo el banco y 2 cuentas
let elbanco = new Librotransaccion("BBVA");
let caja = new Caja("Caja", elbanco.bankAccount);
let cuentaComisiones = new Cuentaempresa("cuentaDelBanco", elbanco.bankAccount);
let cuenta1 = new Cuentaempresa("cuenta1", elbanco.bankAccount);
let cuenta2 = new Cuentaprivada("cuenta2", elbanco.bankAccount);
let cuenta3 = new Cuentaempresa("cuenta3", elbanco.bankAccount);

console.log(elbanco);
console.log(cuenta1);
console.log(cuenta2);
// realizamos 3 transacciones Una por caja y las otras de cuenta a cuenta
elbanco.addTransaccion(caja, cuenta1, 1000, "Alquiler piso", cuentaComisiones);
elbanco.addTransaccion(
  cuenta1,
  cuenta2,
  100,
  "Alquiler plaza",
  cuentaComisiones
);
elbanco.addTransaccion(
  cuenta2,
  cuenta1,
  300,
  "Pago factura nº 231",
  cuentaComisiones
);
//Listamos el registro total
elbanco.listarElementos(elbanco.registro);
// actualizamos saldos de cuentas
cuenta1.saldo = elbanco.calculaAmountForAccount(cuenta1);
cuenta2.saldo = elbanco.calculaAmountForAccount(cuenta2);
cuentaComisiones.saldo = elbanco.calculaAmountForAccount(cuentaComisiones);

// Listamos saldos de las cuentas
cuenta1.listarSaldo();
cuenta2.listarSaldo();
cuenta3.listarSaldo();
cuentaComisiones.listarSaldo();

// Listamos las transacciones de la cuenta1
elbanco.listarElementos(elbanco.findTransactionsForAccount(cuenta1));
// Listamos las transacciones de la cuenta2
elbanco.listarElementos(elbanco.findTransactionsForAccount(cuenta2));
// Listamos las transacciones de la cuenta2
elbanco.listarElementos(elbanco.findTransactionsForAccount(cuentaComisiones));
