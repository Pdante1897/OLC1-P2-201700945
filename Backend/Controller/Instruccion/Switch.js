const Ambito = require("../Ambito/Ambito");
const Operacion = require("../Operacion/Operacion");

function SentenciaSwitch(_instruccion, _ambito) {
    var mensaje = ""
    var existeBreak = false
    var expresionRetorno = null
    var verificar = false
    var condicion = Operacion(_instruccion.expresion, _ambito)
    //Verificar Si existen case
    if (_instruccion.lista_case != null) {
        for (let i = 0; i < _instruccion.lista_case.length; i++) {
            var condicionCase = Operacion(_instruccion.lista_case[i].expresion, _ambito)
            if (condicion.valor == condicionCase.valor || verificar) {
                var nuevoAmbito = new Ambito(_ambito)
                const Bloque = require("./Bloque");
                var eject = Bloque(_instruccion.lista_case[i].instrucciones, nuevoAmbito)
                existeBreak = eject.existeBreak;
                expresionRetorno = eject.expresionRetorno;
                mensaje += eject.cadena
                if (eject.existeBreak) {
                    return{
                        existeBreak: existeBreak,
                        expresionRetorno:expresionRetorno,
                        cadena: mensaje  
                    }
                }
                if(expresionRetorno!=null){
                    return{
                        existeBreak: existeBreak,
                        expresionRetorno: expresionRetorno,
                        cadena: mensaje 
                    }
                }

                verificar = true
                

            }
        }
    }
    //Ejecutar Default
    if (_instruccion.instruccion_default != null ) {
        console.log("##")
        var nuevoAmbito = new Ambito(_ambito)
        const Bloque = require("./Bloque");
        var eject = Bloque(_instruccion.instruccion_default, nuevoAmbito)
        existeBreak = eject.existeBreak;
        expresionRetorno = eject.expresionRetorno;
        mensaje += eject.cadena

        return{
            existeBreak: existeBreak,
            expresionRetorno: expresionRetorno,
            cadena: mensaje 
        }
    }

    //return mensaje

}
module.exports = SentenciaSwitch