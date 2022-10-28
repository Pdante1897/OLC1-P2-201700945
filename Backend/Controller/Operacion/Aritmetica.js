const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultadoSuma = require("./TipoResultadoSuma")
const TipoResultadoResta = require("./TipoResultadoResta")
const TipoResultadoMult = require("./TipoResultadoMult")
const ValorExpresion = require("./ValorExpresion")
const TipoResultadoDiv = require("./TipoResultadoDiv")
const TipoResultadoPow = require("./TipoResultadoPow")
const TipoResultadoModulo = require("./TipoResultadoModulo")
const ValorMetodo = require("./ValorMetodo")
const Reporte = require("../Reporte/Reporte")
function Aritmetica(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOLEANO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo == TIPO_VALOR.IDENTIFICADOR) {

        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA) {
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.RESTA) {
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)

    }
    else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
        return mult(_expresion.opIzq, _expresion.opDer, _ambito)

    }
    else if (_expresion.tipo === TIPO_OPERACION.DIVISION) {
        return div(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.POTENCIA) {
        return pow(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MODULO) {
        return modulo(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.INCREMENTO) {
        return incremento(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.DECREMENTO) {
        return decremento(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.NEGACION) {
        return negacion(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TOLOWER) {
        return opToLower(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TOUPPER) {
        return opToUpper(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.ROUND) {
        return opRound(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TRUNCATE) {
        return opTruncate(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TOSTRING) {
        return opToString(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.CAST) {
        return cast(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.VALOR_VECTOR) {
        return valorVector(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.VALOR_VECTOR2D) {
        return valorVector2D(_expresion.opIzq, _expresion.opDer, _expresion.exp, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.LENGTH) {
        return opLength(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TYPEOF) {
        return opTypeOf(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === "LLAMADA") {
        return ValorMetodo(_expresion, _ambito)
    }
}

function suma(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultadoSuma(opIzq.tipo, opDer.tipo)
    
    if (tipoRes != null) {        
        if (tipoRes === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.CARACTER) {
                opIzq.valor = opIzq.valor.charCodeAt(0)
            } else if (opDer.tipo === TIPO_DATO.CARACTER) {
                opDer.valor = opDer.valor.charCodeAt(0)
            }
            const resultado = Number(opIzq.valor) + Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
        else if (tipoRes === TIPO_DATO.DECIMAL) {
            if (opIzq.tipo === TIPO_DATO.CARACTER) {
                opIzq.valor = opIzq.valor.charCodeAt(0)
            } else if (opDer.tipo === TIPO_DATO.CARACTER) {
                opDer.valor = opDer.valor.charCodeAt(0)
            }
            const resultado = Number(opIzq.valor) + Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
        else if (tipoRes === TIPO_DATO.CADENA) {
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Suma`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion suma... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultadoResta(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        if (tipoRes === TIPO_DATO.ENTERO) {
            const resultado = Number(opIzq.valor) - Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
        else if (tipoRes === TIPO_DATO.DECIMAL) {
            const resultado = Number(opIzq.valor) - Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "") //true+5+10+5
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Resta`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion resta... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function mult(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultadoMult(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        if (tipoRes === TIPO_DATO.ENTERO) {
            const resultado = Number(opIzq.valor) * Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
        else if (tipoRes === TIPO_DATO.DECIMAL) {
            const resultado = Number(opIzq.valor) * Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "") //true+5+10+5
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Multiplicacion`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion multiplicacion... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function div(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultadoDiv(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
        } else if (opDer.tipo === TIPO_DATO.CARACTER) {
            opDer.valor = opDer.valor.charCodeAt(0)
        }
        if (tipoRes === TIPO_DATO.DECIMAL) {
            const resultado = Number(opIzq.valor) / Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }

    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Division`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion division... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function pow(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultadoPow(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.ENTERO) {
            const resultado = Math.pow(Number(opIzq.valor), Number(opDer.valor));
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
        else if (tipoRes === TIPO_DATO.DECIMAL) {
            const resultado = Math.pow(Number(opIzq.valor), Number(opDer.valor));
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }

    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Potencia`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion potencia... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function modulo(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultadoModulo(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.DECIMAL) {
            const resultado = Number(opIzq.valor) % Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opDer.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Modulo`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion modulo... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function incremento(_opIzq, _opDer, _ambito) {
    const existe = _ambito.existeSimbolo(_opIzq)
    if (existe) {
        var simbolo = _ambito.getSimbolo(_opIzq)
        simbolo.valor = Number(simbolo.valor) + 1
        _ambito.actualizar(_opIzq, simbolo)
        return {
            valor: simbolo.valor,
            tipo: simbolo.tipo,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (_opIzq.tipo === null ? _opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Incremento`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion incremento... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function decremento(_opIzq, _opDer, _ambito) {
    const existe = _ambito.existeSimbolo(_opIzq)
    if (existe) {
        var simbolo = _ambito.getSimbolo(_opIzq)
        simbolo.valor = Number(simbolo.valor) - 1
        _ambito.actualizar(_opIzq, simbolo)
        return {
            valor: simbolo.valor,
            tipo: simbolo.tipo,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (_opIzq.tipo === null ? _opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion Decremento`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion decremento... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function negacion(_optIzq, _opDer, _ambito) {
    const opDer = Aritmetica(_opDer, _ambito)
    if (opDer.tipo === "ENTERO") {
        const resultado = 0 - Number(opDer.valor);

        return {
            valor: resultado,
            tipo: TIPO_DATO.ENTERO,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    }
    else if (opDer.tipo === "DECIMAL") {
        const resultado = 0 - Number(opDer.valor);
        return {
            valor: resultado,
            tipo: TIPO_DATO.DECIMAL,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    }
    var respuesta = (opDer.tipo === null ? _opDer.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede realizar la operacion `,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + 'Error semántico: no se puede realizar la operacion ... Linea: ' + _opDer.linea + " Columna: " + _opDer.columna + "\n",
        tipo: null,
        linea: _opDer.linea,
        columna: _opDer.columna
    }
}
//Otras Funciones
function opToLower(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === TIPO_DATO.CADENA) {
        resultado = opIzq.valor.toLowerCase()
        return {
            valor: resultado,
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede aplicar la funcion ToLower a un valor diferente a Cadena`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede aplicara la funcion en un valor diferende a CADENA... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function opToUpper(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === TIPO_DATO.CADENA) {
        resultado = opIzq.valor.toUpperCase()
        return {
            valor: resultado,
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede aplicar la funcion ToUpper a un valor diferente a Cadena`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede aplicara la funcion en un valor diferende a CADENA... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function opRound(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === TIPO_DATO.DECIMAL || opIzq.tipo === TIPO_DATO.ENTERO) {
        resultado = Math.round(opIzq.valor)
        return {
            valor: resultado,
            tipo: TIPO_DATO.DECIMAL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede aplicar la funcion Round en un valor diferente a Entero o Decimal `,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede aplicara la funcion en un valor diferende a Entero o Decimal... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function opTruncate(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === TIPO_DATO.DECIMAL || opIzq.tipo === TIPO_DATO.ENTERO) {
        resultado = Math.trunc(opIzq.valor)
        return {
            valor: resultado,
            tipo: TIPO_DATO.DECIMAL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede aplicar la funcion Truncate a un valor diferente a Entero o Decimal`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede aplicara la funcion en un valor diferende a CADENA... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function opToString(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === TIPO_DATO.DECIMAL || opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.BOOLEANO) {
        resultado = opIzq.valor
        return {
            valor: resultado,
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede aplicar la funcion ToString`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede aplicara la funcion ToString... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function cast(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    //Casteo Int
    if (_opDer === TIPO_DATO.ENTERO) {
        if (opIzq.tipo === TIPO_DATO.DECIMAL) {
            resultado = Math.round(opIzq.valor)
            return {
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }

        } else if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
            resultado = opIzq.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: `No se puede aplicar el casteo de int a un dato de tipo:  +"${opIzq.tipo}"`,
            fila: _opIzq.linea,
            columna: _opIzq.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: respuesta + `Error semántico: no se puede aplicar el casteo de int a un dato de tipo:  +"${opIzq.tipo}"+... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
            tipo: null,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    //Casteo Double
    else if (_opDer === TIPO_DATO.DECIMAL) {
        if (opIzq.tipo === TIPO_DATO.ENTERO) {
            resultado = opIzq.valor + 0.0
            return {
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }

        } else if (opIzq.tipo === TIPO_DATO.CARACTER) {
            opIzq.valor = opIzq.valor.charCodeAt(0)
            resultado = opIzq.valor + 0.0
            return {
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: `No se puede aplicar el casteo de Double a un dato de tipo:  +"${opIzq.tipo}"`,
            fila: _opIzq.linea,
            columna: _opIzq.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: respuesta + `Error semántico: no se puede aplicar el casteo de double a un dato de tipo:  +"${opIzq.tipo}"+... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
            tipo: null,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    //Casteo a Caracter
    else if (_opDer === TIPO_DATO.CARACTER) {
        if (opIzq.tipo === TIPO_DATO.ENTERO) {
            resultado = String.fromCharCode(opIzq.valor)
            return {
                valor: resultado,
                tipo: TIPO_DATO.CARACTER,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }

        }
        var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: `No se puede aplicar el casteo de Char a un dato de tipo:  +"${opIzq.tipo}"`,
            fila: _opIzq.linea,
            columna: _opIzq.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: respuesta + `Error semántico: no se puede aplicar el casteo de char a un dato de tipo:  +"${opIzq.tipo}"+... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
            tipo: null,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: `No se puede aplicar el casteo de tipo:  +"${_opDer.tipo}"`,
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: no se puede aplicar el casteo de tipo +"${_opDer}"+... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function valorVector(_opIzq, _opDer, _ambito) {
    const opDer = Aritmetica(_opDer, _ambito)
    const simbolo = _ambito.getSimbolo(_opIzq)
    if (simbolo != null) {
        if (opDer.tipo === TIPO_DATO.ENTERO) {
            if (opDer.valor < simbolo.valor.length) {
                return {
                    valor: simbolo.valor[opDer.valor],
                    tipo: simbolo.tipo,
                    linea: _opDer.linea,
                    columna: _opDer.columna
                }
            } else {
                var reporte = new Reporte();
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: `La posicion excede el tamaño del vector  +"${_opDer.tipo}"`,
                    fila: _opIzq.linea,
                    columna: _opIzq.columna
                }
                reporte.AgregarError(addError);
                return {
                    valor: `Error semántico: la posicion excede el tamaño del vector... Linea: ${_opDer.linea}+" Columna: "${_opDer.columna}` + "\n",
                    tipo: null,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
        } else {
            var reporte = new Reporte();
            var addError = {
                tipo: "Error Semantico",
                descripcion: `La posicion del vector no es un Entero  +"${_opDer.tipo}"`,
                fila: _opIzq.linea,
                columna: _opIzq.columna
            }
            reporte.AgregarError(addError);
            return {
                valor: `Error semántico: la posicion del Vector no es un Entero... Linea: ${_opDer.linea}" Columna: "${_opDer.columna}` + "\n",
                tipo: null,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    } else {
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: "La variable '" + _opIzq + "' no existe",
            fila: _opIzq.linea,
            columna: _opIzq.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: "Error: la variable '" + _opIzq + "' no existe... Linea: " + _opDer.linea + " Columna: " + _opDer.columna + "\n",
            tipo: null,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }


}

function valorVector2D(_id, _fila, _columna, _ambito) {
    const fila = Aritmetica(_fila, _ambito)
    const columna = Aritmetica(_columna, _ambito)
    const simbolo = _ambito.getSimbolo(_id)

    if (simbolo != null) {
        if (fila.tipo === TIPO_DATO.ENTERO) {
            if (columna.tipo === TIPO_DATO.ENTERO) {
                if (fila.valor < simbolo.valor.length) {
                    if (columna.valor < simbolo.valor[0].length) {
                        return {
                            valor: simbolo.valor[fila.valor][columna.valor],
                            tipo: simbolo.tipo,
                            linea: _id.linea,
                            columna: _id.columna
                        }
                    } else {
                        var reporte = new Reporte();
                        var addError = {
                            tipo: "Error Semantico",
                            descripcion: "La posicion de la columna excede el tamaño del vector",
                            fila: _id.linea,
                            columna: _id.columna
                        }
                        reporte.AgregarError(addError);
                        return {
                            valor: `Error semántico: la posicion de la columna excede el tamaño del vector... Linea: ${_columna.linea}" Columna: "${_columna.columna}` + "\n",
                            tipo: null,
                            linea: _id.linea,
                            columna: _id.columna
                        }
                    }
                } else {
                    var reporte = new Reporte();
                    var addError = {
                        tipo: "Error Semantico",
                        descripcion: "La posicion de la fila excede el tamaño del vector",
                        fila: _id.linea,
                        columna: _id.columna
                    }
                    reporte.AgregarError(addError);
                    return {
                        valor: `Error semántico: la posicion de la fila excede el tamaño del vector... Linea: ${_fila.linea}" Columna: "${_columna.columna}` + "\n",
                        tipo: null,
                        linea: _id.linea,
                        columna: _id.columna
                    }
                }
            } else {
                var reporte = new Reporte();
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "La posicion de la columna del vector no es un entero",
                    fila: _id.linea,
                    columna: _id.columna
                }
                reporte.AgregarError(addError);
                return {
                    valor: `Error semántico: la columna del Vector no es un Entero... Linea: ${_columna.linea}" Columna: "${_columna.columna}` + "\n",
                    tipo: null,
                    linea: _id.linea,
                    columna: _id.columna
                }
            }
        } else {
            var reporte = new Reporte();
            var addError = {
                tipo: "Error Semantico",
                descripcion: "La posicion de la fila del vector no es un entero",
                fila: _id.linea,
                columna: _id.columna
            }
            reporte.AgregarError(addError);
            return {
                valor: `Error semántico: la fila del Vector no es un Entero... Linea: ${_fila.linea}" Columna: "${_columna.columna}` + "\n",
                tipo: null,
                linea: _id.linea,
                columna: _id.columna
            }
        }
    } else {
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: "La variable '" + _id + "' no existe... Linea: ",
            fila: _id.linea,
            columna: _id.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: "Error: la variable '" + _id + "' no existe... Linea: " + _fila.linea + " Columna: " + _columna.columna,
            tipo: null,
            linea: _id.linea,
            columna: _id.columna
        }
    }
}

function opLength(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === "CADENA") {
        resultado = opIzq.valor.length
        return {
            valor: resultado,
            tipo: TIPO_DATO.ENTERO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    } else {
        if (_opIzq.tipo === "VAL_IDENTIFICADOR") {
            const simbolo = _ambito.getSimbolo(_opIzq.valor)
            if (simbolo != null) {
                if (simbolo.tipo2 === "VECTOR" || simbolo.tipo2 === "VECTOR_2DIMENSIONES") {
                    resultado = simbolo.valor.length
                    return {
                        valor: resultado,
                        tipo: TIPO_DATO.ENTERO,
                        linea: _opIzq.linea,
                        columna: _opIzq.columna
                    }
                }
            }
            var respuesta = (_opIzq.tipo === null ? _opIzq.valor : "")
            var reporte = new Reporte();
            var addError = {
                tipo: "Error Semantico",
                descripcion: "No se puede aplicar la funcion Length el identificador no existe ",
                fila: _opIzq.linea,
                columna: _opIzq.columna
            }
            reporte.AgregarError(addError);
            return {
                valor: respuesta + `Error semántico: no se puede aplicar la funcion Length el identificador no existe... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
                tipo: null,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }

        }
    }
    var respuesta = (_opIzq.tipo === null ? _opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: "No se puede aplicar la funcion Length a un valor diferente a CADENA o VECTOR",
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `\nError semántico: no se puede aplicar la funcion en un valor diferente a CADENA o un VECTOR... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function opTypeOf(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    if (opIzq.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "string",
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    } else if (opIzq.tipo === TIPO_DATO.BOOLEANO) {
        return {
            valor: "boolean",
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if (opIzq.tipo === TIPO_DATO.CARACTER) {
        return {
            valor: "char",
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if (opIzq.tipo === TIPO_DATO.ENTERO) {
        return {
            valor: "int",
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if (opIzq.tipo === TIPO_DATO.DECIMAL) {
        return {
            valor: "double",
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    } else {
        if (_opIzq.tipo === "VAL_IDENTIFICADOR") {
            const simbolo = _ambito.getSimbolo(_opIzq.valor)
            if (simbolo != null) {
                return {
                    valor: simbolo.tipo2,
                    tipo: TIPO_DATO.CADENA,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
            var reporte = new Reporte();
            var addError = {
                tipo: "Error Semantico",
                descripcion: "No existe el identificador",
                fila: _opIzq.linea,
                columna: _opIzq.columna
            }
            reporte.AgregarError(addError);
            return {
                valor: respuesta + `Error semántico: No existe el id ... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
                tipo: null,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    var reporte = new Reporte();
    var addError = {
        tipo: "Error Semantico",
        descripcion: "No se puede realizar la operacion typeof",
        fila: _opIzq.linea,
        columna: _opIzq.columna
    }
    reporte.AgregarError(addError);
    return {
        valor: respuesta + `Error semántico: No se puede realizar la operacion typeof .. Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}` + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Aritmetica