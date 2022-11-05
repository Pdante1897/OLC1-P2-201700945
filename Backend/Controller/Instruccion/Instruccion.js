const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
function nuevaOperacion(_opIzq, _opDer, _tipo, _exp, _linea, _columna){
    return{
        opIzq: _opIzq,
        opDer: _opDer,
        tipo: _tipo,
        exp: _exp,
        linea: _linea,
        columna: _columna
    }
}
const Instruccion = {
    nuevoPrint: function(_expresion, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoPrintLn: function(_expresion,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.PRINTLN,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoValor: function(_valor, _tipo, _linea, _columna){
        return{
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaOperacionBinaria: function(_opIzq,_opDer, _tipo, _exp, _linea,_columna){
        return nuevaOperacion(_opIzq, _opDer, _tipo, _exp, _linea, _columna)
    },
    nuevaDeclaracion: function(_id, _valor,_tipo,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaDeclaracionVector: function(_id, _valor,_tipo,_tipo2,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION_VECTOR,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            tipo_dato2: _tipo2,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaDeclaracionVectorChar: function(_id, _valor,_tipo,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION_VECTOR_CHAR,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaDeclaracionVector2Dimensiones: function(_id, _valor,_valor2,_tipo,_tipo2,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION_VECTOR_2DIMENSIONES,
            id: _id,
            valor: _valor,
            valor2: _valor2,
            tipo_dato: _tipo,
            tipo_dato2: _tipo2,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAsignacion: function(_id, _expresion,_fila,_columnaexp,_linea,_columna){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            fila: _fila,
            columnaexp: _columnaexp,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoDoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DOWHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoDoUntil: function(_expresion, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DOUNTIL,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoFor: function(_asignacion, _condicion, _actualizacion,_instrucciones,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.FOR,
            asignacion: _asignacion,
            condicion: _condicion,
            actualizacion: _actualizacion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIncremento: function(_id,_tipo_op,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.INCREMENTADOR,
            id: _id,
            tipo_op: _tipo_op,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoMetodo: function(_nombre, _lista_parametros, _instrucciones,_tipom,_retorno, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            tipom: _tipom,
            retorno: _retorno,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoRun: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.RUN,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaLlamada: function(_nombre, _lista_valores,_linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.LLAMADA,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }

    },
    nuevoIf: function(_expresion, _instrucciones, _linea, _columna) {
        return{
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIfElse: function(_expresion, _instruccionesIf, _instruccionesElse, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IFEL,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoElseIf: function(_expresion, _instruccionesElseIf, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IFELIF,
            expresion: _expresion,
            instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIfConElseIf: function(_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IFELIFCONEL,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoSwitch: function(_expresion, _lista_case, _instruccion_default, _linea,_columna) {
        return{
            tipo: TIPO_INSTRUCCION.SWITCH,
            expresion: _expresion,
            lista_case: _lista_case,
            instruccion_default: _instruccion_default,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoCase: function(_expresion, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.CASE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columa: _columna
        }
    },
    nuevoBreak: function(_linea, _columna) {
        return{
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoReturn: function(_expresion,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.RETURN,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    }


}

module.exports = Instruccion