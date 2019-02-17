// Batalla estelar

// Se quiere emular una batalla entre dos ejercitos de naves espaciales. El pierde la partida quien pierde todas sus naves.

// Cada ejercito podrá seleccionar una nave propia. La nave seleccionará un objetivo rival y disparará.
// La nave 'objetivo' perderá puntos de daño dependiendo de la potencia del  disparo.

// Objetos a crear:
// Una clase Nave
//     Propiedades
//         Daño el daño que hace al disparar
//         Puntos de vida (Escudo)
//         Nombre o Código
//         Estado (Activo o Destruido) (Solo lectura) Get de lectura, si los puntos de vida son 0 está muerto
//     Metodos
//         Disparar (Llama a las funciones siguientes)
//             Selecciona un objetivo, busca algo a lo disparar
//             Lo llama y le ejecuta recibir un disparo
//         Seleccionar Objetivo
//         Recibir disparo (dano) de tantos puntos para descontar.
//             Se descuenta el daño a los puntos de vida
// Tres clases derivadas de Nave: Nave Clase I, Nave Clase II, Nave Clase III
//     Cada una tendrá caracteristicas distintas (10 disparo, 5 vida) (5 disparo, 10 vida) (8 disparo, 7 vida)  (Opcional)
// Una clase ejercito
//     Nombre
//     ListaNaves
//     Estado o    Informe de las naves Get de las naves y en qué estado está con 50% de vida.
//     Derrotado (s/N)
// Una clase Generador de Naves Factory
//     Metodos
//         CrearEjercito(nombre, cantidad clase I, cantidad clase II, cantidad clase III)
//             El total de
//         Distribuir el ejercito en el campo de batalla

// Una clase Campo de Batalla  Gestiona la batalla-
//     Lista de sectores por ejercito (uno para cada ejercito) Sin mezcla.
//     Control de los turnos (clase principal para el juego)
//     Ejecutar turno(ejercito)
//         Seleecionar una nave que dispara Tenemos que seleccionar aleatorio o una configuracion por ejercito.

// Una clase sector:
//     Un array donde se almacenan las naves. Puede ser mismo tamaño que el ejercito (n elementos)
//     o tener más tamaño y quedar huecos (disparo al aire), opcional 2 y tres dimensiones.

//     Metodos:
//         ObtenerElementoEnPosicion(posicion) (devuelve una nave o null)

// Ejemplo de funcionamiento:

class Nave {
  constructor(potencia, escudo, nombre, estado) {
    this.potencia = potencia;
    this.escudo = escudo;
    this.nombre = nombre;
    this.estado = estado;
  }
  disparar() {
    this.seleccionObgetivo();
    this.recibirDisparo();
  }
  seleccionObgetivo() {}
  disparar() {
    return this.potencia;
  }
  recibirDisparo(potencia) {
    this.escudo = this.escudo - potencia;
  }
}

class Nave1 extends Nave {
  constructor() {
    super(10, 5, "Nave1", 100);
  }
}
class Nave2 extends Nave {
  constructor() {
    super(5, 10, "Nave2", 100);
  }
}
class Nave3 extends Nave {
  constructor() {
    super(8, 7, "Nave3", 100);
  }
}

class Ejercito {
  constructor(nombre) {
    this.nombre = nombre;
    this.listadoNaves = [];
    this.derrotado = false;
    this.sector = "";
  }

  // Añado en un array las naves.
  anadirNave(nave) {
    this.listadoNaves.push(nave);
  }
}
class GeneradorNaves {
  constructor() {}
  CrearEjercito(nombre, naves1, naves2, naves3) {
    let ejercito = new Ejercito(nombre);

    this.crearNave(ejercito, naves1, "Nave1");
    this.crearNave(ejercito, naves2, "Nave2");
    this.crearNave(ejercito, naves3, "Nave3");

    return ejercito;
  }

  crearNave(ejercito, cantidad, tipo) {
    for (let index = 1; index <= cantidad; index++) {
      let empiezanave;
      switch (tipo) {
        case "Nave1":
          empiezanave = new Nave1();
          break;
        case "Nave2":
          empiezanave = new Nave2();
          break;
        case "Nave3":
          empiezanave = new Nave3();
          break;

        default:
          break;
      }

      ejercito.anadirNave(empiezanave);
    }
  }
}

class CampoBatalla {
  constructor() {
    this.sector1 = new Sector();
    this.sector2 = new Sector();
  }
  empezarBatalla(ejercito1, ejercito2) {
    this.colocarEjercitos(ejercito1, ejercito2);
    return this.controlDeTurnos(ejercito1, ejercito2);
  }
  colocarEjercitos(ejercito1, ejercito2) {
    this.sector1.colocarNaves(ejercito1);
    ejercito1.sector = this.sector1;
    this.sector2.colocarNaves(ejercito2);
    ejercito2.sector = this.sector2;
  }
  controlDeTurnos(ejercito1, ejercito2) {
    let ataque = ejercito1;
    let defensa = ejercito2;
    while (!ejercito1.derrotado && !ejercito2.derrotado) {
      console.log(
        "Al " +
          ejercito1.nombre +
          " le quedan " +
          ejercito1.sector.inventarioNaves() +
          " naves"
      );
      console.log(
        "A " +
          ejercito2.nombre +
          " le quedan " +
          ejercito2.sector.inventarioNaves() +
          " naves"
      );

      this.ejecutarTurno(ataque, defensa);

      if (ataque == ejercito1) {
        ataque = ejercito2;
        defensa = ejercito1;
      } else {
        ataque = ejercito1;
        defensa = ejercito2;
      }

      if (this.sector1.poscionNaves.length <= 0) {
        ejercito1.derrotado = true;
        //Si pierde el 1 pasamos como ganador al 2
        return ejercito2;
      } else {
        if (this.sector2.poscionNaves.length <= 0) {
          ejercito2.derrotado = true;
          //Si pierde el 2 pasamos como ganador al 1
          return ejercito1;
        }
      }
    }
  }

  ejecutarTurno(ejercitoataque, ejercitodefensa) {
    let posicion1 = ejercitoataque.sector.randomNaves();
    let posicion2 = ejercitodefensa.sector.randomNaves();

    console.log(
      ejercitoataque.listadoNaves[posicion1].nombre +
        " de " +
        ejercitoataque.nombre +
        " dispara a la " +
        ejercitodefensa.sector.poscionNaves[posicion2].nombre +
        " de " +
        ejercitodefensa.nombre
    );
    ejercitodefensa.sector.poscionNaves[posicion2].recibirDisparo(
      ejercitoataque.listadoNaves[posicion1].disparar()
    );
    // si la vida de la nave es menor que 0 la borro del array
    if (ejercitodefensa.sector.poscionNaves[posicion2].escudo < 0) {
      ejercitodefensa.sector.borrarNave(posicion2);
      console.log("PUM!! Nave destruída");
      console.log(" ");
    }
  }
}

class Sector {
  constructor() {
    this.poscionNaves = [];
  }

  randomNaves() {
    return Math.floor(Math.random() * this.poscionNaves.length) + 0;
  }
  inventarioNaves() {
    return this.poscionNaves.length;
  }
  colocarNaves(ejercito) {
    ejercito.listadoNaves.forEach(element => {
      this.poscionNaves.push(element);
    });
  }
  borrarNave(posicion) {
    // Borra 1 elemento desde la posicion
    this.poscionNaves.splice(posicion, 1);
  }
}

let generador = new GeneradorNaves();

const ejercito1 = generador.CrearEjercito("LADO OSCURO", 3, 5, 7);
const ejercito2 = generador.CrearEjercito("RESISTECIA", 3, 5, 7);

let campoDeBatalla = new CampoBatalla();
let ganador = campoDeBatalla.empezarBatalla(ejercito1, ejercito2);

console.log("LA GALAXIA ES DE " + ganador.nombre);

//(si son distintos se generan partidas desiguales, asi que habrá que controlar esto al añadir los ejercitos)
