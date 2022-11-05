const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Aritmetica = require("./Aritmetica")
const ValorExpresion = require("./ValorExpresion")
const ValorMetodo = require("./ValorMetodo")
const Reporte = require("../Reporte/Reporte")
const Logica = require("./Logica")
function Relacional(_expresion, _ambito) {
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
    else if(_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL) {
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.DIFERENTE) {
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MAYOR) {
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MENOR) {
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MENORIGUAL) {
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === "LLAMADA") {
        return ValorMetodo(_expresion, _ambito)
    }
}

function igualigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.CADENA && opDer.tipo === TIPO_DATO.CADENA)|| (opIzq.tipo === TIPO_DATO.BOOLEANO && opDer.tipo === TIPO_DATO.BOOLEANO)) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        var resultado = false
        if (opIzq.valor == opDer.valor) {
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
        descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`+"\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }

}

function diferente(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.CADENA && opDer.tipo === TIPO_DATO.CADENA)|| (opIzq.tipo === TIPO_DATO.BOOLEANO && opDer.tipo === TIPO_DATO.BOOLEANO)) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        var resultado = false
        if (opIzq.valor != opDer.valor) {
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
        descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }

}

function mayor(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.DECIMAL)||
         (opIzq.tipo === TIPO_DATO.BOOLEANO && opDer.tipo === TIPO_DATO.BOOLEANO)) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        var resultado = false
        if (opIzq.valor > opDer.valor) {
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
        descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`+"\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }

}

function menor(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.DECIMAL)|| 
        (opIzq.tipo === TIPO_DATO.BOOLEANO && opDer.tipo === TIPO_DATO.BOOLEANO)) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        var resultado = false
        if (opIzq.valor < opDer.valor) {
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
        descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`+"\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }

}
function mayorigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.DECIMAL)|| 
        (opIzq.tipo === TIPO_DATO.BOOLEANO && opDer.tipo === TIPO_DATO.BOOLEANO)) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        var resultado = false
        if (opIzq.valor >= opDer.valor) {
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
        descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`+"\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }

}

function menorigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL) || (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.ENTERO) ||
        (opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.CARACTER) || (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.DECIMAL)|| 
        (opIzq.tipo === TIPO_DATO.BOOLEANO && opDer.tipo === TIPO_DATO.BOOLEANO)) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        var resultado = false
        if (opIzq.valor <= opDer.valor) {
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
        descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`+"\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }

}

module.exports = Relacional