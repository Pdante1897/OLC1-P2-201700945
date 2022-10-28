const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");
const CicloWhile = require("./While");
const Incremento = require("./Incremento");
const SentenciaIf = require("./If");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIf = require("./IfElseIf");
const CicloFor = require("./For");
const CicloDoWhile = require("./DoWhile");
const CicloDoUntil = require("./DoUntil");
const SentenciaSwitch = require("./Switch");
const PrintLn = require("./PrintLn");
const DeclaracionVector = require("./DeclaracionVector");
const DeclaracionVector2Dimensiones = require("./DeclaracionVector2Dimensiones");
const Operacion = require("../Operacion/Operacion");
const Return = require("./Return");
const DeclaracionVectorChar = require("./DeclaracionVectorChar");

function Bloque(_instrucciones, _ambito) {
    var cadena = ""
    var existeBreak = false
    var expresionRetorno = null
    _instrucciones.forEach(instruccion => {
        if (existeBreak) {
            return {
                expresionRetorno: expresionRetorno,
                existeBreak: existeBreak,
                cadena: cadena
            }
        }else if(expresionRetorno!=null){ 
            return {
                expresionRetorno: expresionRetorno,
                existeBreak: existeBreak,
                cadena: cadena
            }
        }
        if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
            cadena += Print(instruccion, _ambito) 
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINTLN){
            cadena += PrintLn(instruccion, _ambito) 
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR) {
            var mensaje = DeclaracionVector(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_CHAR) {
            var mensaje = DeclaracionVectorChar(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_2DIMENSIONES) {
            var mensaje = DeclaracionVector2Dimensiones(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
            var eject = CicloWhile(instruccion, _ambito)
            var mensaje = eject.cadena
            existeBreak = eject.existeBreak
            expresionRetorno = eject.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
            var eject = CicloDoWhile(instruccion, _ambito)
            var mensaje = eject.cadena
            existeBreak = eject.existeBreak
            expresionRetorno = eject.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DOUNTIL) {
            var eject = CicloDoUntil(instruccion, _ambito)
            var mensaje = eject.cadena
            existeBreak = eject.existeBreak
            expresionRetorno = eject.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
            var mensaje = CicloFor(instruccion, _ambito)
            existeBreak = mensaje.existeBreak
            expresionRetorno = mensaje.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje.cadena 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.INCREMENTADOR) {
            var mensaje = Incremento(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA) {
            const Run = require("./Run");
            var mensaje = Run(instruccion, _ambito)
            existeBreak = mensaje.existeBreak
            expresionRetorno = mensaje.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje.cadena 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
            var eject = SentenciaIf(instruccion, _ambito)
            var mensaje = eject.cadena
            existeBreak = eject.existeBreak
            expresionRetorno = eject.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.IFEL) {
            var eject = SentenciaIfElse(instruccion, _ambito)
            var mensaje = eject.cadena
            existeBreak = eject.existeBreak
            expresionRetorno = eject.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.IFELIFCONEL) {
            var eject = SentenciaIfElseIf(instruccion, _ambito)
            var mensaje = eject.cadena
            existeBreak = eject.existeBreak
            expresionRetorno = eject.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            var mensaje = SentenciaSwitch(instruccion, _ambito)
            existeBreak = mensaje.expresionRetorno//Si no jala agregar false aqui
            expresionRetorno = mensaje.expresionRetorno
            if (mensaje != null) {
                cadena += mensaje.cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            var eject = Return(instruccion,_ambito)
            //.log(eject)
            if(eject != null){
                expresionRetorno = eject
            }else{
                expresionRetorno ={
                    valor:null,
                    tipo: null,
                    linea: instruccion.linea,
                    columna: instruccion.columna
                }
            }
                        
            return{
                expresionRetorno: expresionRetorno,
                existeBreak: existeBreak,
                cadena: cadena 
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
            existeBreak = true
            return {
                existeBreak: existeBreak,
                expresionRetorno: expresionRetorno,
                cadena: cadena
            }
        }
    });
    return {
        expresionRetorno: expresionRetorno,
        existeBreak: existeBreak,
        cadena: cadena
    }
}

module.exports = Bloque