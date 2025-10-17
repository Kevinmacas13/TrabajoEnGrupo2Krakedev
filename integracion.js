let cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

let esNuevo = false;

movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]

cargarCuenta= function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();// mostramos la tabla en el body al inicio

}

cargarTransacciones=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
}

cargarMovimientos=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");}
/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/
mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */

    // 1️⃣ Buscar el elemento HTML donde se mostrará la tabla
    // En este caso, el contenedor con id="tablaResumen cono no hay le creamos para crear la tabla "
    let cmpTabla = document.getElementById("tablaResumen");

    // 2️⃣ Crear el encabezado de la tabla con los títulos de las columnas
    // Se arma como un texto HTML (string)
    let contenidoTabla = "<table class=\"miTabla\"><tr>" +
        "<th>NUMERO DE CUENTA</th>" +
        "<th>NOMBRE</th>" +
        "<th>SALDO</th>" +
        "</tr>";

    // 3️⃣ Declarar una variable para recorrer el arreglo 'Cuentas'
    let elementoCuenta;

    // 4️⃣ Recorrer el arreglo global 'Cuentas'
    // Cada elemento del arreglo es un objeto 'cuentas' con datos del empleado
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i]; // tomar el rol actual

        // 5️⃣ Agregar una nueva fila (<tr>) con las celdas (<td>) de los datos
        // Usamos 'toFixed(2)' para mostrar los números con 2 decimales
        contenidoTabla +=
            "<tr><td>" + elementoCuenta.numeroCuenta + "</td>" + // Numero de cuenta
            //aqui unimos nombre y cuenta cuando dice q concatenar.
            "<td>" + elementoCuenta.nombre + " " + elementoCuenta.apellido + "</td>" +      // Nombre del la persona en esta parte concatenamos 
            "<td>" + elementoCuenta.saldo.toFixed(2) + "</td>" + //saldo
            "</tr>";
    }

    // 6️⃣ Cerrar la tabla agregando la etiqueta </table>
    contenidoTabla += "</table>";

    // 7️⃣ Insertar todo el contenido HTML dentro del elemento del documento
    // Esto actualiza la tabla visible en pantalla
    cmpTabla.innerHTML = contenidoTabla;



}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    // Recorremos el arreglo roles
    for (let i = 0; i < cuentas.length; i++) {
        let cuenta = cuentas[i];
        // Si encontramos la cuebta correspondiente, retornamos el objeto rol
        if (cuenta.numeroCuenta == numeroCuenta) {
            return cuenta;
        }
    }
    // Si no encontramos nada, retornamos null
    return null;

}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {

    // Verificamos si ya existe una cuenta  con el  misma numero de cuenta
    let existeCuenta = buscarCuenta(cuenta.numeroCuenta);

    if (existeCuenta == null) {
        cuentas.push(cuenta);
        //Si se agrega, mostrar un alert CUENTA AGREGADA
        alert("CUENTA AGREGADA");
    } else {
        //Si ya existe mostrar un alert CUENTA EXISTENTE
        alert("CUENTA EXISTENTE");
    }
}

agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    // Toma los valores de las cajas de texto (sin validaciones)
    let valorNumeroCuenta = recuperarTexto("txtNumeroCuenta");     // Usa recuperarTexto porque es un string
    let valorCedula = recuperarInt("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");                 // Cedula también es string (no int)
    let valorApellido = recuperarTexto("txtApellido"); // Nombre completo

    // Crea un objeto cuenta con los atributos
    let cuenta = {
        numeroCuenta: valorNumeroCuenta,
        cedula: valorCedula, //aqui en el HTML no estaba al caja de texto pero nosotros le agregamos 
        nombre: valorNombre,
        apellido: valorApellido,
        saldo: 0.0
    };

    // Invoca a agregarCuenta
    agregarCuenta(cuenta);

    // Invoca a mostrarCuentas para actualizar la tabla
    mostrarCuentas();

    mostrarComponente("divTransacciones");
}


ejecutarBusqueda = function () {
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let cuentaBusqueda = recuperarTexto("txtCuentaExistente");
    let cuentaEncontrada = buscarCuenta(cuentaBusqueda);
    if (cuentaEncontrada == null) {
        alert("NUMERO DE CUENTA NO EXISTE");
    } else {
        mostrarTexto("txtNumeroCuentaExistente", cuentaEncontrada.numeroCuenta);
        mostrarTexto("txtNombreCuenta", cuentaEncontrada.nombre + " " + cuentaEncontrada.apellido);
        mostrarTexto("txtCedulaCuenta", cuentaEncontrada.cedula);
        mostrarTexto("txtSaldoCuenta", cuentaEncontrada.saldo);
    }
    habilitarComponente("btnDepositar");
    habilitarComponente("btnRetirar");
}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta)
    if (cuentaAfectada != null) {
        cuentaAfectada.saldo = cuentaAfectada.saldo + monto;
        let movimiento = {
            numeroCuenta: numeroCuenta,
            monto: monto,
            tipo: "C"
        };
        movimientos.push(movimiento);
        return true;
    }
    return false;
}

ejecutarDeposito = function () {
    let numeroCuenta = recuperarTexto("txtCuentaExistente");
    let monto = recuperarFloat("txtMonto");
    let resultado = depositar(numeroCuenta, monto);
    if (resultado) {
        alert("TRANSACCION EXITOSA");
        let cuentaActualizada = buscarCuenta(numeroCuenta);
        mostrarTexto("txtNumeroCuentaExistente", cuentaActualizada.numeroCuenta);
        mostrarTexto("txtNombreCuenta", cuentaActualizada.nombre + " " + cuentaActualizada.apellido);
        mostrarTexto("txtCedulaCuenta", cuentaActualizada.cedula);
        mostrarTexto("txtSaldoCuenta", cuentaActualizada.saldo);
    }
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada != null) {
        if (cuentaAfectada.saldo >= monto) {
            cuentaAfectada.saldo = cuentaAfectada.saldo - monto;
            let movimiento={
                numeroCuenta:numeroCuenta,
                monto:monto,
                tipo:"D"
            };
            movimientos.push(movimiento);
            return true;
        } else {
            alert("SALDO INSUFICIENTE");
        }
    }
    return false;
}

ejecutarRetiro = function () {
    let numeroCuenta = recuperarTexto("txtCuentaExistente");
    let monto = recuperarFloat("txtMonto");
    let resultado = retirar(numeroCuenta, monto);
    if (resultado) {
        alert("TRANSACCION EXITOSA");
        let cuentaActualizada = buscarCuenta(numeroCuenta);
        mostrarTexto("txtNumeroCuentaExistente", cuentaActualizada.numeroCuenta);
        mostrarTexto("txtNombreCuenta", cuentaActualizada.nombre + " " + cuentaActualizada.apellido);
        mostrarTexto("txtCedulaCuenta", cuentaActualizada.cedula);
        mostrarTexto("txtSaldoCuenta", cuentaActualizada.saldo);
    }
}
//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


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





//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


