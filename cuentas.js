cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();// mostramos la tabla en el body al inicio

}

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
    let valorCedula=recuperarInt("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");                 // Cedula también es string (no int)
    let valorApellido= recuperarTexto("txtApellido"); // Nombre completo

    // Crea un objeto cuenta con los atributos
    let cuenta = {
        numeroCuenta: valorNumeroCuenta,
        cedula: valorCedula, //aqui en el HTML no estaba al caja de texto pero nosotros le agregamos 
        nombre: valorNombre,
        apellido:valorApellido,
        saldo: 0.0
    };

    // Invoca a agregarCuenta
    agregarCuenta(cuenta);

    // Invoca a mostrarCuentas para actualizar la tabla
    mostrarCuentas();
}

