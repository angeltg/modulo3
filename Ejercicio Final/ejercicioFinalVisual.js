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
    this.imagen = "Nave1.png";
    this.imagen_danho = "Nave1.png";
    this.identificador = 0;
  }
  disparar() {
    return this.potencia;
  }
  //Resta del escudo la potencia de disparo recibida y devuelve el estado
  recibirDisparo(potencia) {
    this.escudo = this.escudo - potencia;
    return this.escudo;
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
    this.imagen = "Nave2.png";
    this.imagen_danho = "Nave2_danho.png";
  }
}
class Nave3 extends Nave {
  constructor() {
    super(8, 7, "Nave3", 100);
    this.imagen = "Nave3.png";
    this.imagen_danho = "Nave3_danho.png";
  }
}

class Ejercito {
  constructor(nombre, capa) {
    this.nombre = nombre;
    this.listadoNaves = [];
    //La uso para desordenar las naves.
    this.listadoNavesColocar = [];
    this.derrotado = false;
    this.sector = "";
    this.capa = capa;
  }

  // Añado en un array las naves.
  anadirNave(nave) {
    this.listadoNaves.push(nave);
    this.listadoNavesColocar.push(nave);
  }

  randomNavesEjercito() {
    return Math.floor(Math.random() * this.listadoNavesColocar.length) + 0;
  }
}
class GeneradorNaves {
  constructor() {}
  CrearEjercito(nombre, naves1, naves2, naves3, capa) {
    let ejercito = new Ejercito(nombre, capa);

    this.crearNave(ejercito, naves1, "Nave1");
    this.crearNave(ejercito, naves2, "Nave2");
    this.crearNave(ejercito, naves3, "Nave3");

    return ejercito;
  }

  //Dependiendo del tipo de nave creo un objeto y otro.
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

  //Coloca los ejercitos en el campo de batalla y empiezan los turnos de disparo
  empezarBatalla(ejercito1, ejercito2) {
    this.colocarEjercitos(ejercito1, ejercito2);
    return this.controlDeTurnos(ejercito1, ejercito2);
  }
  colocarEjercitos(ejercito1, ejercito2) {
    this.sector1.colocarYBorrar(ejercito1, ejercito1.capa);
    //Al ejército le paso el sector para que el código de ejecutar turno se más legible
    ejercito1.sector = this.sector1;
    this.sector2.colocarYBorrar(ejercito2, ejercito2.capa);
    ejercito2.sector = this.sector2;
  }

  //Mostramos por consola el etado de los 2 ejércitos
  mostrarEstadoEquipos(ejercito1, ejercito2) {
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
  }

  //Miramos si el array de los dos sectores tienen elementos.
  comprobarEstadoEjercitos() {
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
    return false;
  }

  // Esta función se llama cuando se pulsa el botón de disparar.
  controlDeTurnosPorTecla(ataque, defensa) {
    if (!ataque.derrotado && !defensa.derrotado) {
      if (this.ejecutarTurno(ataque, defensa)) {
        // this.mostrarEstadoEquipos(ejercito1, ejercito2);
      }
    }

    // Si el comprobar estados devuelve falso es que no ha terminado la partirda.
    let final = this.comprobarEstadoEjercitos();
    if (final) {
      document.getElementById("botondedisparo").innerHTML =
        "<h1>GAME OVER</h1><h1> LA GALAXIA HA SIDO DOMINADA POR " +
        final.nombre;
      return false;
    } else {
      return ataque;
    }
  }

  //Mostramos por consola quien dispara, con qué potencia, a quién y con qué se defiende
  mostrarDisparo(ejercitoataque, ejercitodefensa, posicion1, posicion2) {
    console.log(
      ejercitoataque.listadoNaves[posicion1].nombre +
        " con " +
        ejercitoataque.listadoNaves[posicion1].potencia +
        " de potencia" +
        " de " +
        ejercitoataque.nombre +
        " dispara a la " +
        ejercitodefensa.sector.poscionNaves[posicion2].nombre +
        " con " +
        ejercitodefensa.sector.poscionNaves[posicion2].escudo +
        " de escudo" +
        " de " +
        ejercitodefensa.nombre
    );
  }

  ejecutarTurno(ejercitoataque, ejercitodefensa) {
    // Hacemos el random de la posición de disparo y de la posición de recepción del disparo
    let posicion1 = ejercitoataque.sector.randomNaves();
    let posicion2 = ejercitodefensa.sector.randomNaves();

    //Mostramos por consola quien dispara, con qué potencia, a quién y con qué se defiende
    this.mostrarDisparo(ejercitoataque, ejercitodefensa, posicion1, posicion2);

    //Recibir el disparo nos devuelve el estado de la nave
    let estadoDeLaNave = ejercitodefensa.sector.poscionNaves[
      posicion2
    ].recibirDisparo(ejercitoataque.listadoNaves[posicion1].disparar());
    // si la vida de la nave es menor que 0 la borro del array del sector
    if (estadoDeLaNave <= 0) {
      ejercitodefensa.sector.borrarNave(posicion2, ejercitodefensa.capa);
      console.log("PUM!! Nave destruída");
      console.log(" ");

      return true;
    } else {
      ejercitodefensa.sector.danhoNave(posicion2, ejercitodefensa.capa);
    }
    return false;
  }
}

class Sector {
  constructor() {
    this.poscionNaves = [];
  }

  //Devuleve un random sobre las posiciones del total del array
  randomNaves() {
    return Math.floor(Math.random() * this.poscionNaves.length) + 0;
  }
  //Nos dice las naves que quedan en el sector
  inventarioNaves() {
    return this.poscionNaves.length;
  }

  //Vamos a colocar la naves en el campo de batalla de una forma desordenada
  colocarYBorrar(ejercito, capa) {
    let posicionNave = ejercito.randomNavesEjercito();
    const element = ejercito.listadoNavesColocar[posicionNave];
    //Le doy un index a cada nave para poder cambiar su imagen por un PUM! cuando es destruída
    ejercito.listadoNavesColocar[posicionNave].identificador =
      capa + posicionNave;
    this.poscionNaves.push(element);
    let div = document.getElementById(capa);

    div.innerHTML +=
      '<li id="' +
      capa +
      posicionNave +
      '"><img src="img/' +
      element.imagen +
      '" alt="' +
      element.nombre +
      '"></li>';
    // Borra 1 elemento desde la posicion
    ejercito.listadoNavesColocar.splice(posicionNave, 1);

    //Si el array aún tiene naves volvemos a llamar a la función
    if (ejercito.listadoNavesColocar.length > 0) {
      this.colocarYBorrar(ejercito, capa);
    }
  }

  //Coloca las naves en el sector. El orden es el mismo ya que la aleatoriedad la gestiono en el turno.
  colocarNaves(ejercito, capa) {
    for (let index = 0; index < ejercito.listadoNaves.length; index++) {
      const element = ejercito.listadoNaves[index];
      //Le doy un index a cada nave para poder cambiar su imagen por un PUM! cuando es destruída
      ejercito.listadoNaves[index].identificador = capa + index;

      this.poscionNaves.push(element);
      let div = document.getElementById(capa);

      div.innerHTML +=
        '<li id="' +
        capa +
        index +
        '"><img src="img/' +
        element.imagen +
        '" alt="' +
        element.nombre +
        '"></li>';
    }
  }
  //La nave que se ha quedado sin escudo es eliminada del arraconditionconditionconditionconditiconditionconditionony del sector
  borrarNave(posicion, capa) {
    let d = document.getElementById(capa);
    let d_nested = document.getElementById(
      this.poscionNaves[posicion].identificador
    );
    //Antes de borrarla de la lista cambiamos la imagen por un PUM! que aguanta 1 segundo.
    if (capa == "ejercitoarriba") {
      d_nested.innerHTML = '<img src="img/pum.png" alt="Pum!">';
    } else {
      d_nested.innerHTML = '<img src="img/pum-rotate.png" alt="Pum!">';
    }

    setTimeout(function() {
      //Borramos el elemento de la lista que contiene la nave destruída
      d.removeChild(d_nested);
    }, 1000);

    // Borra 1 elemento desde la posicion
    this.poscionNaves.splice(posicion, 1);
  }
  //La nave que no ha sido destruída tiene un daño. Cambiamos la imagen.
  danhoNave(posicion, capa) {
    let d = document.getElementById(capa);
    let d_nested = document.getElementById(
      this.poscionNaves[posicion].identificador
    );

    d_nested.innerHTML =
      '<img src="img/' +
      this.poscionNaves[posicion].imagen_danho +
      '" alt="Nave  dañada">';
  }
}

let generador = new GeneradorNaves();

const ejercito1 = generador.CrearEjercito(
  "EL LADO OSCURO",
  3,
  5,
  7,
  "ejercitoarriba"
);
const ejercito2 = generador.CrearEjercito(
  "LA RESISTECIA",
  3,
  5,
  7,
  "ejercitoabajo"
);

let campoDeBatalla = new CampoBatalla();

campoDeBatalla.colocarEjercitos(ejercito1, ejercito2);

let ataque = ejercito1;
let defensa = ejercito2;

//Esta función la acciona el usuario cada vez que pusla el botón.
function disparamos() {
  ataque = campoDeBatalla.controlDeTurnosPorTecla(ataque, defensa);

  if (ataque == ejercito1) {
    ataque = ejercito2;
    defensa = ejercito1;
  } else {
    ataque = ejercito1;
    defensa = ejercito2;
  }
}
