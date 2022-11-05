const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function SentenciaIfElseIf(_instruccion, _ambito) {
    var mensaje = ""
    var condicion = Operacion(_instruccion.expresion, _ambito)
    var existeBreak = false
    var expresionRetorno = null
    if (condicion.tipo === TIPO_DATO.BOOLEANO) {
        if (condicion.valor) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var eject = Bloque(_instruccion.instruccionesIf, nuevoAmbito)
            existeBreak = eject.existeBreak;
            expresionRetorno = eject.expresionRetorno;
            mensaje += eject.cadena
            return {
                expresionRetorno: expresionRetorno,
                existeBreak: existeBreak,
                cadena: mensaje
            }

        }
        for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
            var operacionif = Operacion(_instruccion.lista_elseif[i].expresion, _ambito)
            if (operacionif.tipo === TIPO_DATO.BOOLEANO) {
                if (operacionif.valor) {
                    var nuevoAmbito = new Ambito(_ambito)
                    const Bloque = require("./Bloque");
                    var eject = Bloque(_instruccion.lista_elseif[i].instruccionesElseIf, nuevoAmbito)
                    existeBreak = eject.existeBreak;
                    expresionRetorno = eject.expresionRetorno;
                    mensaje += eject.cadena
                    return {
                        expresionRetorno: expresionRetorno,
                        existeBreak: existeBreak,
                        cadena: mensaje
                    }
                }
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: `No es una condicion valida para la Sentenica If`,
                    fila: _instruccion.lista_elseif[i].linea,
                    columna: _instruccion.lista_elseif[i].columna
                }
                reporte.AgregarError(addError);
                mensaje += `Error: No es una condicion válida para el if... Linea: ${_instruccion.lista_elseif[i].linea} Columna: ${_instruccion.lista_elseif[i].columna}`+"\n"
            }
        }
        if (_instruccion.instruccionesElse != null) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesElse, nuevoAmbito)
            existeBreak = ejec.existeBreak;
            expresionRetorno = ejec.expresionRetorno;
            mensaje += ejec.cadena
        }
        return {
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
    return {
        existeBreak: existeBreak,
        expresionRetorno: expresionRetorno,
        cadena: `Error: No es una condicion valida para la Sentencia if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`+"\n"
    }
}

module.exports = SentenciaIfElseIf