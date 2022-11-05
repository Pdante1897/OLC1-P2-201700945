const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")
const Reporte = require("../Reporte/Reporte")
function Run(_instruccion, _ambito) {
    var cadena = ""
    var ejecutar = _ambito.getMetodo(_instruccion.nombre)
    var existeBreak = false;
    var reporte = new Reporte();
    var expresionRetorno = null;
    if (ejecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
        if (ejecutar.lista_parametros != null) {
            if (_instruccion.lista_valores != null && ejecutar.lista_parametros.length == _instruccion.lista_valores.length) {
                var error = false;
                for (let i = 0; i < ejecutar.lista_parametros.length; i++) {
                    var declaracionAsig = Instruccion.nuevaDeclaracion(ejecutar.lista_parametros[i].id, _instruccion.lista_valores[i], ejecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)                    
                    var mensaje = DecParametro(declaracionAsig, nuevoAmbito)
                    if (mensaje != null) {
                        error = true
                        cadena += mensaje + '\n'
                    }
                }
                if (error) {
                    return cadena
                }
                var eject = Bloque(ejecutar.instrucciones, nuevoAmbito)
                var mensaje = eject.cadena
                if (eject.existeBreak) {
                    mensaje += "Error: Se encontro un break fuera de un ciclo"
                }
                return {
                    cadena: mensaje,
                    existeBreak: eject.existeBreak,
                    expresionRetorno: eject.expresionRetorno
                }
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: `Faltan valores para el metodo ${_instruccion.nombre}`,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return {
                    cadena: `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                    existeBreak: existeBreak,
                    expresionRetorno: expresionRetorno
                }
               // return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
        }
        else {
            var eject = Bloque(ejecutar.instrucciones, nuevoAmbito)
            var mensaje = eject.cadena
           /* if(eject.expresionRetorno!=null){
                return mensaje
            }*/
            if (eject.existeBreak) {
                mensaje += "Error: Se encontro un break fuera de un ciclo"
            }
            return {
                cadena: mensaje,
                existeBreak: eject.existeBreak,
                expresionRetorno: eject.expresionRetorno
            }
            //return mensaje
        }
    }
    var addError = {
        tipo: "Error Semantico",
        descripcion: `El metodo '${_instruccion.nombre}' no existe`,
        fila: _instruccion.linea,
        columna: _instruccion.columna
    }
    reporte.AgregarError(addError);
    return {
        cadena: `Error: El metodo '${_instruccion.nombre}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
        existeBreak: existeBreak,
        expresionRetorno: expresionRetorno
    }
   // return `Error: El metodo '${_instruccion.nombre}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Run