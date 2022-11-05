const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultadoDiv(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER || _tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL || _tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER || _tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.DECIMAL
    }
    return null
}

module.exports = TipoResultadoDiv