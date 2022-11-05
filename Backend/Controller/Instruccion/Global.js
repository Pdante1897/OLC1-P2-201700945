const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const DeclaracionVector = require("./DeclaracionVector")
const DeclaracionVector2Dimensiones = require("./DeclaracionVector2Dimensiones")
const DeclaracionVectorChar = require("./DeclaracionVectorChar")
const DecMetodo = require("./DecMetodo")
const Run = require("./Run")

function Global(_instrucciones, _ambito){
    var cadena = ""
    //console.log(_instrucciones)
    // Primera Pasada
    var contRun = 0;
    for(let i=0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.RUN){
            contRun++;
        }
    }

    if(contRun==0){
        return 'Error: no se a detectado la sentencia RUN'
    }else if(contRun >1){
        return 'Error: Se detecto mas de una sentencia RUN'
    }

    //Segunda pasada
    for(let i=0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION){
            var msj = Declaracion(_instrucciones[i], _ambito)
            if(msj!=null){
                cadena+=msj+'\n'
            }
        }else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR){
            var msj = DeclaracionVector(_instrucciones[i],_ambito)
            if(msj!=null){
                cadena+=msj+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_CHAR){
            var msj = DeclaracionVectorChar(_instrucciones[i],_ambito)
            if(msj!=null){
                cadena+=msj+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_2DIMENSIONES){
            var msj = DeclaracionVector2Dimensiones(_instrucciones[i],_ambito)
            if(msj!=null){
                cadena+=msj+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION){
            var msj = Asignacion(_instrucciones[i], _ambito)
            if(msj!=null){
                cadena+=msj+'\n'
            }
        }
        else if(_instrucciones[i].tipo === TIPO_INSTRUCCION.DEC_METODO){
            var msj = DecMetodo(_instrucciones[i], _ambito)
            if(msj!=null){
                cadena+=msj+'\n'
            }
        }
    }

    //Tercera Pasada 
    for(let i=0; i<_instrucciones.length; i++){
        if(_instrucciones[i].tipo === TIPO_INSTRUCCION.RUN){
            var mensaje = Run(_instrucciones[i], _ambito)
            if(mensaje != null){
                cadena += mensaje.cadena
            }
            break
        }
    }
    return cadena
}

module.exports = Global