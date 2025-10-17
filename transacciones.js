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
        mostrarTexto("txtNumeroCuentaExistente",cuentaEncontrada.numeroCuenta);
        mostrarTexto("txtNombreCuenta",cuentaEncontrada.nombre+" "+cuentaEncontrada.apellido);
        mostrarTexto("txtCedulaCuenta",cuentaEncontrada.cedula);
        mostrarTexto("txtSaldoCuenta",cuentaEncontrada.saldo);
    }
    habilitarComponente("btnDepositar");
    habilitarComponente("btnRetirar");
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
    let numeroCuenta=recuperarTexto("txtCuentaExistente");
    let monto=recuperarFloat("txtMonto");
    let resultado=depositar(numeroCuenta,monto);
    if(resultado){
        alert("TRANSACCION EXITOSA");
        let cuentaActualizada=buscarCuenta(numeroCuenta);
        mostrarTexto("txtNumeroCuentaExistente",cuentaActualizada.numeroCuenta);
        mostrarTexto("txtNombreCuenta",cuentaActualizada.nombre+" "+cuentaActualizada.apellido);
        mostrarTexto("txtCedulaCuenta",cuentaActualizada.cedula);
        mostrarTexto("txtSaldoCuenta",cuentaActualizada.saldo);
    }
}

retirar=function(numeroCuenta,monto){
    let cuentaAfectada=buscarCuenta(numeroCuenta);
    if(cuentaAfectada!=null){
        if(cuentaAfectada.saldo>=monto){
            cuentaAfectada.saldo=cuentaAfectada.saldo-monto;
            return true;
        }else{
            alert("SALDO INSUFICIENTE");
        }
    }
    return false;
}

ejecutarRetiro=function(){
    let numeroCuenta=recuperarTexto("txtCuentaExistente");
    let monto=recuperarFloat("txtMonto");
    let resultado=retirar(numeroCuenta,monto);
    if(resultado){
        alert("TRANSACCION EXITOSA");
        let cuentaActualizada=buscarCuenta(numeroCuenta);
        mostrarTexto("txtNumeroCuentaExistente",cuentaActualizada.numeroCuenta);
        mostrarTexto("txtNombreCuenta",cuentaActualizada.nombre+" "+cuentaActualizada.apellido);
        mostrarTexto("txtCedulaCuenta",cuentaActualizada.cedula);
        mostrarTexto("txtSaldoCuenta",cuentaActualizada.saldo);
    } 
}

filtrarMovimientos = function (numeroCuenta) {
  let movimientosCuenta = [];
  for (let i = 0; i < movimientos.length; i++) {
    let movimiento = movimientos[i];
    if (movimiento.numeroCuenta == numeroCuenta) {
      movimientosCuenta.push(movimiento);
    }
  }
 
  mostrarMovimientos(movimientosCuenta);
};
