const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const Reporte = require("../Reporte/Reporte")
function CicloWhile(_instruccion, _ambito){
    var reporte = new Reporte();
    var mensaje = ""
    var existeBreak = false
    var expresionRetorno = null
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BOOLEANO){
        while (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var eject = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += eject.cadena
            existeBreak = eject.existeBreak;
            expresionRetorno = eject.expresionRetorno;
            if (eject.existeBreak) {
                return{
                    existeBreak: existeBreak,
                    expresionRetorno: expresionRetorno,
                    cadena: mensaje
                }
            }
            if(eject.expresionRetorno!=null){
                return{
                    existeBreak: existeBreak,
                    expresionRetorno: expresionRetorno,
                    cadena: mensaje
                }
            }
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return{
            existeBreak: existeBreak,
            expresionRetorno: expresionRetorno,
            cadena: mensaje
        }
    }
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No es una expresion de tipo BANDERA en la condicion`,
        fila: _instruccion.linea,
        columna: _instruccion.columna
    }
    reporte.AgregarError(addError);
    return{
        existeBreak: existeBreak,
        expresionRetorno: expresionRetorno,
        cadena: `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`+"\n"
    }
}

module.exports = CicloWhile