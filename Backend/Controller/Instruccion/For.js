const Ambito = require("../Ambito/Ambito")
const Simbolo = require("../Ambito/Simbolo")
const TIPO_DATO = require("../Enums/TipoDato")
const TIPO = require("../Enums/Tipo")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const Operacion = require("../Operacion/Operacion")
const Reporte = require("../Reporte/Reporte")
function CicloFor(_instruccion, _ambito) {
    var mensaje = ""
    var existeBreak = false
    var expresionRetorno = null
    var ambitoFor = new Ambito(_ambito)
    var reporte = new Reporte();
    if (_instruccion.asignacion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
        if (_instruccion.asignacion.id == _instruccion.condicion.opIzq.valor || _instruccion.asignacion.id == _instruccion.condicion.opDer.valor) {
            if (_instruccion.actualizacion.id == _instruccion.asignacion.id) {

                //Asignacion
                const id = _instruccion.asignacion.id;
                const existe = ambitoFor.existeSimbolo(id)
                if (existe) {
                    var valor = Operacion(_instruccion.asignacion.expresion, ambitoFor)
                    var simbolo = ambitoFor.getSimbolo(id)
                    var tipos = {
                        tipoSimbolo: simbolo.tipo,
                        tipoNuevoValor: valor.tipo
                    }
                    if (tipos.tipoSimbolo === tipos.tipoNuevoValor) {
                        simbolo.valor = valor.valor
                        ambitoFor.actualizar(id, simbolo)
                    }
                    else {
                        var addError = {
                            tipo: "Error Semantico",
                            descripcion: "No es posible asignar un valor de tipo " + tipos.tipoNuevoValor + " a la variable \n '" + id + " ' que es de tipo" + tipos.tipoSimbolo,
                            fila: _instruccion.asignacion.linea,
                            columna: _instruccion.asignacion.columna
                        }
                        reporte.AgregarError(addError);
                        return "Error: No es posible asignar un valor de tipo " + tipos.tipoNuevoValor + " a la variable \n '" + id + " ' que es de tipo" + tipos.tipoSimbolo + "...Linea: " + _instruccion.asignacion.linea + " Columna: " + _instruccion.asignacion.columna+"\n";
                    }
                }
                else {
                    var addError = {
                        tipo: "Error Semantico",
                        descripcion: `La variable '${String(id)}' no existe`,
                        fila: _instruccion.asignacion.linea,
                        columna: _instruccion.asignacion.columna
                    }
                    reporte.AgregarError(addError);
                    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.asignacion.linea} Columna: ${_instruccion.asignacion.columna} \n`
                }
                //CONDICION
                var condicion = Operacion(_instruccion.condicion, ambitoFor);
                if (condicion.tipo === TIPO_DATO.BOOLEANO) {
                    while (condicion.valor) {
                        var nuevoAmbito = new Ambito(ambitoFor)
                        const Bloque = require('./Bloque')
                        var eject = Bloque(_instruccion.instrucciones, nuevoAmbito)
                        mensaje += eject.cadena
                        if (eject.existeBreak) {
                            return {
                                existeBreak: eject.existeBreak,
                                expresionRetorno: eject.expresionRetorno,
                                cadena: mensaje
                            }
                        }
                        //Actualizacion
                        const id = _instruccion.actualizacion.id;
                        const existe = ambitoFor.existeSimbolo(id)
                        var optipo = ambitoFor.getSimbolo(id)
                        if (existe) {
                            if (optipo.tipo == "ENTERO" || optipo.tipo == "DECIMAL") {
                                if (_instruccion.actualizacion.tipo_op === TIPO_OPERACION.INCREMENTO) {
                                    var simbolo = ambitoFor.getSimbolo(id)
                                    simbolo.valor = Number(simbolo.valor) + 1
                                    ambitoFor.actualizar(id, simbolo)
                                }
                                else if (_instruccion.actualizacion.tipo_op === TIPO_OPERACION.DECREMENTO) {
                                    var simbolo = ambitoFor.getSimbolo(id)
                                    simbolo.valor = Number(simbolo.valor) - 1
                                    ambitoFor.actualizar(id, simbolo)
                                } else if (_instruccion.actualizacion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                                    var simbolo = ambitoFor.getSimbolo(id)
                                    var valor = Operacion(_instruccion.actualizacion.expresion, ambitoFor)
                                    if (valor.tipo === TIPO_DATO.DECIMAL || valor.tipo === TIPO_DATO.ENTERO) {
                                        simbolo.valor = valor.valor
                                        ambitoFor.actualizar(id, simbolo)
                                    } else {
                                        var addError = {
                                            tipo: "Error Semantico",
                                            descripcion: 'El resultado de la operacion es de tipo ' + valor.tipo,
                                            fila: _instruccion.actualizacion.linea,
                                            columna: _instruccion.actualizacion.columna
                                        }
                                        reporte.AgregarError(addError);
                                        return {
                                            existeBreak: eject.existeBreak,
                                            expresionRetorno: eject.expresionRetorno,
                                            cadena: 'Error semántico: el resultado de la operacion es de tipo ' + valor.tipo + '... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna+"\n"
                                        }
                                        //  return '\nError semántico: el resultado de la operacion es de tipo ' + valor.tipo + '... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna
                                    }

                                }
                            }
                            else {
                                var addError = {
                                    tipo: "Error Semantico",
                                    descripcion: 'Error semántico: no se puede realizar la operacion ' + _instruccion.actualizacion.tipo_op,
                                    fila: _instruccion.actualizacion.linea,
                                    columna: _instruccion.actualizacion.columna
                                }
                                reporte.AgregarError(addError);
                                return {
                                    existeBreak: eject.existeBreak,
                                    expresionRetorno: eject.expresionRetorno,
                                    cadena: 'Error semántico: no se puede realizar la operacion ' + _instruccion.actualizacion.tipo_op + '... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna+"\n"
                                }
                                // return '\nError semántico: no se puede realizar la operacion ' + _instruccion.actualizacion.tipo_op + '... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna
                            }
                        }
                        else {
                            var addError = {
                                tipo: "Error Semantico",
                                descripcion: `Error: la variable '${String(id)}' no existe`,
                                fila: _instruccion.actualizacion.linea,
                                columna: _instruccion.actualizacion.columna
                            }
                            reporte.AgregarError(addError);
                            return {
                                existeBreak: eject.existeBreak,
                                expresionRetorno: eject.expresionRetorno,
                                cadena: `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`+"\n"
                            }
                            // return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`
                        }
                        condicion = Operacion(_instruccion.condicion, ambitoFor)
                    }
                    return {
                        existeBreak: existeBreak,
                        expresionRetorno: expresionRetorno,
                        cadena: mensaje
                    }
                    // return mensaje

                }
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: `No es una expresion de tipo BANDERA en la condicion`,
                    fila: _instruccion.actualizacion.linea,
                    columna: _instruccion.actualizacion.columna
                }
                reporte.AgregarError(addError);
                return {
                    existeBreak: existeBreak,
                    expresionRetorno: expresionRetorno,
                    cadena: `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`+"\n"
                }
                // return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`
            }
            var addError = {
                tipo: "Error Semantico",
                descripcion: `Actualizacion invalida`,
                fila: _instruccion.actualizacion.linea,
                columna: _instruccion.actualizacion.columna
            }
            reporte.AgregarError(addError);
            return {
                existeBreak: existeBreak,
                expresionRetorno: expresionRetorno,
                cadena: `Error: Actualizacion invalida... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`+"\n"
            }
            //  return `Error: Actualizacion invalida... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`
        }
        var addError = {
            tipo: "Error Semantico",
            descripcion: `Condicion invalida`,
            fila: _instruccion.condicion.linea,
            columna: _instruccion.condicion.columna
        }
        reporte.AgregarError(addError);
        return {
            existeBreak: existeBreak,
            expresionRetorno: expresionRetorno,
            cadena: `Error: Condicion invalida... Linea: ${_instruccion.condicion.linea} Columna: ${_instruccion.condicion.columna}`+"\n"
        }
        //return `Error: Condicion invalida... Linea: ${_instruccion.condicion.linea} Columna: ${_instruccion.condicion.columna}`
        //FOR con DEclaracion
    } else if (_instruccion.asignacion.tipo === TIPO_INSTRUCCION.DECLARACION || _instruccion.asignacion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
        if (_instruccion.asignacion.id == _instruccion.condicion.opIzq.valor || _instruccion.asignacion.id == _instruccion.condicion.opDer.valor) {
            if (_instruccion.actualizacion.id == _instruccion.asignacion.id) {
                //DECLARACION
                if (_instruccion.asignacion.tipo_dato === TIPO_DATO.ENTERO) {
                    var valor = 0
                    if (_instruccion.asignacion.valor != null) {
                        var op = Operacion(_instruccion.asignacion.valor, ambitoFor)
                        tipo = op.tipo;
                        if (tipo === TIPO_DATO.ENTERO) {
                            valor = op.valor;
                        }
                        else {
                            var addError = {
                                tipo: "Error Semantico",
                                descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.asignacion.id + " que es de tipo " + TIPO_DATO.ENTERO,
                                fila: _instruccion.asignacion.linea,
                                columna: _instruccion.asignacion.columna
                            }
                            reporte.AgregarError(addError);
                            return {
                                existeBreak: existeBreak,
                                expresionRetorno: expresionRetorno,
                                cadena: "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.asignacion.id + " que es de tipo " + TIPO_DATO.ENTERO + "...Linea: " + _instruccion.asignacion.linea + " Columna: " + _instruccion.asignacion.columna+"\n"
                            }
                            // return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.asignacion.id + " que es de tipo " + TIPO_DATO.ENTERO + "...Linea: " + _instruccion.asignacion.linea + " Columna: " + _instruccion.asignacion.columna
                        }
                    }
                    const nuevoSimbolo = new Simbolo(_instruccion.asignacion.id[0], valor, TIPO_DATO.ENTERO, TIPO.VARIABLE, _instruccion.asignacion.linea, _instruccion.asignacion.columna)

                    if (ambitoFor.existeSimbolo(nuevoSimbolo.id) != false) {
                        var addError = {
                            tipo: "Error Semantico",
                            descripcion: "Error: La variable '" + nuevoSimbolo.id + "' ya existe",
                            fila: nuevoSimbolo.linea,
                            columna: nuevoSimbolo.columna
                        }
                        reporte.AgregarError(addError);
                        return {
                            existeBreak: existeBreak,
                            expresionRetorno: expresionRetorno,
                            cadena: "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna+"\n"
                        }
                        //return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna
                    }
                    ambitoFor.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                    //-------------Agregando a la Tabla-------------------
                    var addSimbolo = {
                        id: nuevoSimbolo.id,
                        tipo: "Variable",
                        tipo2: "Int",
                        entorno: "For",
                        fila: _instruccion.linea,
                        columna: _instruccion.columna
                    }
                    reporte.AgregarSimbolo(addSimbolo);
                }
                //CONDICION
                var condicion = Operacion(_instruccion.condicion, ambitoFor);
                if (condicion.tipo === TIPO_DATO.BOOLEANO) {
                    while (condicion.valor) {
                        var nuevoAmbito = new Ambito(ambitoFor)
                        const Bloque = require('./Bloque')
                        var eject = Bloque(_instruccion.instrucciones, nuevoAmbito)
                        mensaje += eject.cadena
                        if (eject.existeBreak) {
                            return {
                                existeBreak: eject.existeBreak,
                                expresionRetorno: eject.expresionRetorno,
                                cadena: mensaje
                            }
                        }
                        //Actualizacion

                        const id = _instruccion.actualizacion.id;
                        const existe = ambitoFor.existeSimboloAmbitoActual(id)
                        var optipo = ambitoFor.getSimbolo(id)
                        if (existe) {
                            if (optipo.tipo == "ENTERO" || optipo.tipo == "DECIMAL") {
                                if (_instruccion.actualizacion.tipo_op === TIPO_OPERACION.INCREMENTO) {
                                    var simbolo = ambitoFor.getSimbolo(id)
                                    simbolo.valor = Number(simbolo.valor) + 1
                                    ambitoFor.actualizar(id, simbolo)
                                }
                                else if (_instruccion.actualizacion.tipo_op === TIPO_OPERACION.DECREMENTO) {
                                    var simbolo = ambitoFor.getSimbolo(id)
                                    simbolo.valor = Number(simbolo.valor) - 1
                                    ambitoFor.actualizar(id, simbolo)
                                } else if (_instruccion.actualizacion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                                    var simbolo = ambitoFor.getSimbolo(id)
                                    var valor = Operacion(_instruccion.actualizacion.expresion, ambitoFor)
                                    if (valor.tipo === TIPO_DATO.DECIMAL || valor.tipo === TIPO_DATO.ENTERO) {
                                        simbolo.valor = valor.valor
                                        ambitoFor.actualizar(id, simbolo)
                                    } else {
                                        var addError = {
                                            tipo: "Error Semantico",
                                            descripcion: 'El resultado de la operacion es de tipo ' + valor.tipo,
                                            fila: _instruccion.actualizacion.linea,
                                            columna: _instruccion.actualizacion.columna
                                        }
                                        reporte.AgregarError(addError);
                                        return {
                                            existeBreak: eject.existeBreak,
                                            expresionRetorno: eject.expresionRetorno,
                                            cadena: 'Error semántico: el resultado de la operacion es de tipo ' + valor.tipo + ' ... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna+"\n"
                                        }
                                        // return '\nError semántico: el resultado de la operacion es de tipo ' + valor.tipo + ' ... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna
                                    }
                                }
                            }
                            else {
                                var addError = {
                                    tipo: "Error Semantico",
                                    descripcion: 'No se puede realizar la operacion ' + _instruccion.actualizacion.tipo_op,
                                    fila: _instruccion.actualizacion.linea,
                                    columna: _instruccion.actualizacion.columna
                                }
                                reporte.AgregarError(addError);
                                return {
                                    existeBreak: eject.existeBreak,
                                    expresionRetorno: eject.expresionRetorno,
                                    cadena: 'Error semántico: no se puede realizar la operacion ' + _instruccion.actualizacion.tipo_op + '... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna+"\n"
                                }
                                //return '\nError semántico: no se puede realizar la operacion ' + _instruccion.actualizacion.tipo_op + '... Linea: ' + _instruccion.actualizacion.linea + " Columna: " + _instruccion.actualizacion.columna
                            }
                        }
                        else {
                            var addError = {
                                tipo: "Error Semantico",
                                descripcion: `La variable '${String(id)}' no existe`,
                                fila: _instruccion.actualizacion.linea,
                                columna: _instruccion.actualizacion.columna
                            }
                            reporte.AgregarError(addError);
                            return {
                                existeBreak: eject.existeBreak,
                                expresionRetorno: eject.expresionRetorno,
                                cadena: `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`+"\n"
                            }
                            // return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`
                        }
                        condicion = Operacion(_instruccion.condicion, ambitoFor)
                    }
                    return {
                        existeBreak: existeBreak,
                        expresionRetorno: expresionRetorno,
                        cadena: mensaje
                    }
                    // return mensaje
                }
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: `No es una expresion de tipo BANDERA en la condicion`,
                    fila: _instruccion.actualizacion.linea,
                    columna: _instruccion.actualizacion.columna
                }
                reporte.AgregarError(addError);
                return {
                    existeBreak: existeBreak,
                    expresionRetorno: expresionRetorno,
                    cadena: `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`+"\n"
                }
                // return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`
            }
            var addError = {
                tipo: "Error Semantico",
                descripcion: `Actualizacion Invalida`,
                fila: _instruccion.actualizacion.linea,
                columna: _instruccion.actualizacion.columna
            }
            reporte.AgregarError(addError);
            return {
                existeBreak: existeBreak,
                expresionRetorno: expresionRetorno,
                cadena: `Error: Actualizacion invalida... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`+"\n"
            }
            //return `Error: Actualizacion invalida... Linea: ${_instruccion.actualizacion.linea} Columna: ${_instruccion.actualizacion.columna}`
        }
        var addError = {
            tipo: "Error Semantico",
            descripcion: `Condicion Invalida`,
            fila: _instruccion.condicion.linea,
            columna: _instruccion.condicion.columna
        }
        reporte.AgregarError(addError);
        return {
            existeBreak: existeBreak,
            expresionRetorno: expresionRetorno,
            cadena: `Error: Condicion invalida ... Linea: ${_instruccion.condicion.linea} Columna: ${_instruccion.condicion.columna}`+"\n"
        }
        // return `Error: Condicion invalida ... Linea: ${_instruccion.condicion.linea} Columna: ${_instruccion.condicion.columna}`
    }
    var addError = {
        tipo: "Error Semantico",
        descripcion: `Asignacion/Declaracion Invalida`,
        fila: _instruccion.asignacion.linea,
        columna: _instruccion.asignacion.columna
    }
    reporte.AgregarError(addError);
    return {
        existeBreak: existeBreak,
        expresionRetorno: expresionRetorno,
        cadena: `Error: Asignacion/Declaracion  invalida... Linea: ${_instruccion.asignacion.linea} Columna: ${_instruccion.asignacion.columna}`+"\n"
    }
    //return `Error: Asignacion/Declaracion  invalida... Linea: ${_instruccion.asignacion.linea} Columna: ${_instruccion.asignacion.columna}`
}

module.exports = CicloFor