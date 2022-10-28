const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultadoSuma(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.ENTERO
    }
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.CADENA){
        return TIPO_DATO.CADENA
    }
    else if(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CARACTER){
        return TIPO_DATO.CADENA
    }
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL || _tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.BOOLEANO || _tipo1 === TIPO_DATO.BOOLEANO && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.ENTERO
    }
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER || _tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.ENTERO
    }
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CADENA || _tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.ENTERO){
        return TIPO_DATO.CADENA
    }
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.BOOLEANO || _tipo1 === TIPO_DATO.BOOLEANO && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER || _tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.DECIMAL
    }
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CADENA || _tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.DECIMAL){
        return TIPO_DATO.CADENA
    }
    else if(_tipo1 === TIPO_DATO.BOOLEANO && _tipo2 === TIPO_DATO.CADENA || _tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.BOOLEANO){
        return TIPO_DATO.CADENA
    }
    else if(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CADENA || _tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.CARACTER){
        return TIPO_DATO.CADENA
    }

    return null
}

module.exports = TipoResultadoSuma