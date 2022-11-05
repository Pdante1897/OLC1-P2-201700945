const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")
const ValorMetodo = require("./ValorMetodo")
const Reporte = require("../Reporte/Reporte")
const Aritmetica = require("./Aritmetica")
function Logica(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOLEANO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo == TIPO_VALOR.IDENTIFICADOR) {

        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || _expresion.tipo === TIPO_OPERACION.DIVISION || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO ||
        _expresion.tipo === TIPO_OPERACION.INCREMENTO || _expresion.tipo === TIPO_OPERACION.DECREMENTO || _expresion.tipo === TIPO_OPERACION.NEGACION 
        || _expresion.tipo === TIPO_OPERACION.TOLOWER || _expresion.tipo === TIPO_OPERACION.TOUPPER || _expresion.tipo === TIPO_OPERACION.ROUND 
        || _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.TOSTRING || _expresion.tipo === TIPO_OPERACION.CAST
        || _expresion.tipo === TIPO_OPERACION.VALOR_VECTOR || _expresion.tipo === TIPO_OPERACION.VALOR_VECTOR2D || _expresion.tipo === TIPO_OPERACION.LENGTH
        || _expresion.tipo === TIPO_OPERACION.TYPEOF) {
        return Aritmetica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MAYOR ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL || _expresion.tipo === TIPO_OPERACION.MENORIGUAL) {
        return Relacional(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR) {
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.AND) {
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.NOT) {
        return not(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === "LLAMADA") {
        return ValorMetodo(_expresion, _ambito)
    }
}

function or(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === "BOOLEANO") {
        var resultado = false
        if (opIzq.valor || opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: ` No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function and(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === "BOOLEANO") {
        var resultado = false
        if (opIzq.valor && opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: ` No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}.. Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`+"\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_opIzq, _opDer, _ambito) {
    const opDer = Logica(_opDer, _ambito)
    if (opDer.tipo === "BOOLEANO") {
        resultado = !opDer.valor
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    }
    var respuesta = (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede comparar con un valor diferente a BOOLEANO`,
        fila: _opDer.linea,
        columna: _opDer.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `\nError semántico: no se puede comparar un valor diferente a BOOLEANO... Linea: +${_opDer.linea}+" Columna: "+${_opDer.columna}`+"\n",
        tipo: null,
        linea: _opDer.linea,
        columna: _opDer.columna
    }
}

module.exports = Logica