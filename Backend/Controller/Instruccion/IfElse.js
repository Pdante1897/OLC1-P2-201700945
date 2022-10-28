const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const Reporte = require("../Reporte/Reporte")
function SentenciaIfElse(_instruccion, _ambito){
    var reporte = new Reporte();
    var mensaje = ""
    var condicion = Operacion(_instruccion.expresion, _ambito)
    var existeBreak = false
    var expresionRetorno = null 
    if(condicion.tipo === TIPO_DATO.BOOLEANO){
        if(condicion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var eject =Bloque(_instruccion.instruccionesIf,nuevoAmbito) 
            existeBreak = eject.existeBreak;
            expresionRetorno = eject.expresionRetorno;
            mensaje += eject.cadena
            
        }
        else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var eject =Bloque(_instruccion.instruccionesElse,nuevoAmbito) 
            existeBreak = eject.existeBreak;
            expresionRetorno = eject.expresionRetorno
            mensaje += eject.cadena
        }
        return{
            existeBreak: existeBreak,
            expresionRetorno: expresionRetorno,
            cadena: mensaje
        }
    }
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No es una condicion valida para la Sentenica If`,
        fila: _instruccion.linea,
        columna: _instruccion.columna
    }
    reporte.AgregarError(addError);
    return{
        expresionRetorno: expresionRetorno,
        existeBreak: existeBreak,
        cadena: `Error: No es una condicion valida para la Sentencia if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`+"\n"
    }
}

module.exports = SentenciaIfElse