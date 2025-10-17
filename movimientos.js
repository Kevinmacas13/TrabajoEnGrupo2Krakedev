let movimientos = [
  { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
  { numeroCuenta: "02345211", monto: 45.9, tipo: "D" },
  { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
  { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
  { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
];

cargar = function () {
  mostrarComponente("divMovimientos");
  ocultarComponente("divCuentas");
  ocultarComponente("divTransacciones");
};

filtrarMovimientos = function (numeroCuenta) {
  let movimientosCuenta = [];
  //Se barre el arreglo de movimientos
  for (let i = 0; i < movimientos.length; i++) {
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    let movimiento = movimientos[i];
    if (movimiento.numeroCuenta == numeroCuenta) {
      //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
      movimientosCuenta.push(movimiento);
    }
  }
  //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
  mostrarMovimientos(movimientosCuenta);
};

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos = function (misMovimientos) {
  //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
  let tabla =
    '<table class="miTabla"><tr>' +
    "<th>CUENTA</th>" +
    "<th>MONTO</th>" +
    "<th>OPERACIÓN</th>" +
    "</tr>";
  let movimientoModificado;
  for (let i = 0; i < misMovimientos.length; i++) {
    let movimiento = misMovimientos[i];
    if (movimiento.tipo == "D") {
      movimientoModificado = movimiento.monto * -1;
    } else if (movimiento.tipo == "C") {
      movimientoModificado = movimiento.monto;
    }
    tabla +=
      "<tr><td>" +
      movimiento.numeroCuenta +
      "</td>" +
      "<td>" +
      movimientoModificado +
      "</td>" +
      "<td>" +
      movimiento.tipo +
      "</td>" +
      "</tr>";
  }
  tabla += "</table>";
  document.getElementById("tablaMovimientos").innerHTML = tabla;

  //Columnas: NUMERO CUENTA, MONTO, TIPO
  //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
  //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
  //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
};

verMovimientos = function () {
  let numeroCuenta = recuperarTexto("txtCuenta");
  filtrarMovimientos(numeroCuenta);
};
