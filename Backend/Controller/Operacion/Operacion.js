const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Logica = require("./Logica");
const Relacional = require("./Relacional");
const ValorExpresion = require("./ValorExpresion");
const ValorMetodo = require("./ValorMetodo");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOLEANO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo == TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || _expresion.tipo === TIPO_OPERACION.DIVISION || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO ||
        _expresion.tipo === TIPO_OPERACION.INCREMENTO || _expresion.tipo === TIPO_OPERACION.DECREMENTO || _expresion.tipo === TIPO_OPERACION.NEGACION 
        || _expresion.tipo === TIPO_OPERACION.TOLOWER || _expresion.tipo === TIPO_OPERACION.TOUPPER || _expresion.tipo === TIPO_OPERACION.ROUND 
        || _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.TOSTRING || _expresion.tipo === TIPO_OPERACION.CAST
        || _expresion.tipo === TIPO_OPERACION.VALOR_VECTOR || _expresion.tipo === TIPO_OPERACION.VALOR_VECTOR2D || _expresion.tipo === TIPO_OPERACION.LENGTH
        || _expresion.tipo === TIPO_OPERACION.TYPEOF){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MAYOR||
        _expresion.tipo === TIPO_OPERACION.MENOR ||_expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }else if(_expresion.tipo === "LLAMADA"){
        return ValorMetodo(_expresion, _ambito)
    }

}

module.exports = Operacion