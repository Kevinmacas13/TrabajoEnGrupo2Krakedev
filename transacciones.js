let cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]
let esNuevo=false;

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    let elementoCuenta;
    let elementoCuentaEncontrada=null;
    for(let i=0;i<cuentas.length;i++){
        elementoCuenta=cuentas[i];
        if(elementoCuenta.numeroCuenta==numeroCuenta){
            elementoCuentaEncontrada=elementoCuenta;
            break;
        }
    }
    return elementoCuentaEncontrada;
}

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let cuentaBusqueda=recuperarTexto("txtCuentaExistente");
    let cuentaEncontrada=buscarCuenta(cuentaBusqueda);
    if(cuentaEncontrada==null){
        alert("NUMERO DE CUENTA NO EXISTE");
    }else{
       mostarInfo();
    }
    habilitarComponente("btnDepositar");
    habilitarComponente("btnRetirar");
}
mostarInfo=function(){
    mostrarTextoEnCaja("txtNumeroCuentaExistente",cuentaEncontrada.numeroCuenta);
    mostrarTextoEnCaja("txtNombreCuenta",cuentaEncontrada.nombre+" "+cuentaEncontrada.apellido);
    mostrarTextoEnCaja("txtCedulaCuenta",cuentaEncontrada.cedula);
    mostrarTextoEnCaja("txtSaldoCuenta",cuentaEncontrada.saldo);
}
depositar=function(numeroCuenta,monto){
    let cuentaAfectada=buscarCuenta(numeroCuenta)
    if(cuentaAfectada!=null){
        cuentaAfectada.saldo=cuentaAfectada.saldo+monto;
        return true;
    }
    return false;
}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let numeroCuenta=recuperarTexto("txtCuentaExistente");
    let monto=recuperarFloat("txtMonto");
    let resultado=depositar(numeroCuenta,monto);
    alert("TRANSACCION EXITOSA");
    mostarInfo();
}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
}

ejecutarRetiro=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
}