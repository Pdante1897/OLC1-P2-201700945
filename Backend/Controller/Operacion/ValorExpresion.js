const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_VALOR = require("../Enums/TipoValor")
const Reporte = require("../Reporte/Reporte")
function ValorExpresion(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL) {
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.DECIMAL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.BOOLEANO) {
        return {
            valor: _expresion.valor.toLowerCase() === 'true' ? true : false,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.CADENA) {
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length - 1),
            tipo: TIPO_DATO.CADENA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.ENTERO) {
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.ENTERO,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.CARACTER) {
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length - 1),
            tipo: TIPO_DATO.CARACTER,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
        const simbolo = _ambito.getSimbolo(_expresion.valor)
        if (simbolo != null) {            
                return {
                    valor: simbolo.valor,
                    tipo: simbolo.tipo,
                    linea: simbolo.linea,
                    columna: simbolo.columna
                }
             
        }
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: "La variable '" + _expresion.valor + "' no existe",
            fila: _expresion.linea,
            columna: _expresion.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: "Error: la variable '" + _expresion.valor + "' no existe... Linea: " + _expresion.linea + " Columna: " + _expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
}

module.exports = ValorExpresion