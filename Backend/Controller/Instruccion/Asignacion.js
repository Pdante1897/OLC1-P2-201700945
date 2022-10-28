const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");
const Operacion = require("../Operacion/Operacion");
const Reporte = require("../Reporte/Reporte")
function Asignacion(_instruccion, _ambito) {
    const id = _instruccion.id;
    var reporte = new Reporte();
    const existe = _ambito.existeSimbolo(id)
    if (existe) {
        if (_instruccion.fila != null) {//Es  un vector 

            if (_instruccion.columnaexp != null) {//2 dimensiones                
                var simbolo = _ambito.getSimbolo(id)
                if (simbolo.tipo2 === "VECTOR_2DIMENSIONES") {
                    var fila = Operacion(_instruccion.fila, _ambito)
                    if (fila.tipo === TIPO_DATO.ENTERO) {
                        if (fila.valor < simbolo.valor.length) {//verificar que el tamaño de la fila sea valido
                            var columna = Operacion(_instruccion.columnaexp, _ambito)
                            if (columna.tipo === TIPO_DATO.ENTERO) {
                                if (columna.valor < simbolo.valor[0].length) {//verificar que el tamaño de la fila sea valido
                                    var valor = Operacion(_instruccion.expresion, _ambito)//valor ingresado a la posicion del vector
                                    if (simbolo.tipo === valor.tipo) {
                                        simbolo.valor[fila.valor][columna.valor] = valor.valor
                                        _ambito.actualizar(simbolo.id, simbolo)
                                        return null;
                                    } else {
                                        //--------------Agregando Errores a Tabla de Errores---------------------------
                                        var addError = {
                                            tipo: "Error Semantico",
                                            descripcion: "No es posible asignar un valor de tipo " + valor.tipo + " a la variable '" + simbolo.id + "' que es de tipo " + simbolo.tipo,
                                            fila: _instruccion.linea,
                                            columna: _instruccion.columna
                                        }
                                        reporte.AgregarError(addError);
                                        return "Error: No es posible asignar un valor de tipo " + valor.tipo + " a la variable '" + simbolo.id + "' que es de tipo " + simbolo.tipo + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                                    }

                                } else {
                                    //--------------Agregando Errores a Tabla de Errores---------------------------
                                    var addError = {
                                        tipo: "Error Semantico",
                                        descripcion: "La posicion del vector ingresada excede el tamaño de la columna del vector  " + simbolo.id,
                                        fila: _instruccion.linea,
                                        columna: _instruccion.columna
                                    }
                                    reporte.AgregarError(addError);
                                    return "La posicion del vector ingresada excede el tamaño de la columna del vector  " + simbolo.id + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                                }
                            } else {
                                //--------------Agregando Errores a Tabla de Errores---------------------------
                                var addError = {
                                    tipo: "Error Semantico",
                                    descripcion: "La posicion de la columna del vector  " + simbolo.id + " no es un entero",
                                    fila: _instruccion.linea,
                                    columna: _instruccion.columna
                                }
                                reporte.AgregarError(addError);
                                return "La posicion de la columna del vector  " + simbolo.id + " no es un entero" + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                            }
                        } else {
                            //--------------Agregando Errores a Tabla de Errores---------------------------
                            var addError = {
                                tipo: "Error Semantico",
                                descripcion: "La posicion del vector ingresada excede el tamaño de la fila del vector  " + simbolo.id,
                                fila: _instruccion.linea,
                                columna: _instruccion.columna
                            }
                            reporte.AgregarError(addError);
                            return "La posicion del vector ingresada excede el tamaño de la fila del vector  " + simbolo.id + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                        }
                    } else {
                        //--------------Agregando Errores a Tabla de Errores---------------------------
                        var addError = {
                            tipo: "Error Semantico",
                            descripcion: "La posicion de la fila del vector  " + simbolo.id + " no es un entero",
                            fila: _instruccion.linea,
                            columna: _instruccion.columna
                        }
                        reporte.AgregarError(addError);
                        return "La posicion de la fila del vector  " + simbolo.id + " no es un entero" + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                    }
                } else {
                    //--------------Agregando Errores a Tabla de Errores---------------------------
                    var addError = {
                        tipo: "Error Semantico",
                        descripcion: "La variable " + simbolo.id + " no es un vector",
                        fila: _instruccion.linea,
                        columna: _instruccion.columna
                    }
                    reporte.AgregarError(addError);
                    return "La variable " + simbolo.id + " no es un vector" + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                }
            } else {//1dimension
                var simbolo = _ambito.getSimbolo(id)
                if (simbolo.tipo2 === "VECTOR") {//verificar si es un vector
                    var fila = Operacion(_instruccion.fila, _ambito)
                    if (fila.tipo === TIPO_DATO.ENTERO) {
                        if (fila.valor < simbolo.valor.length) {//verificar que el tamaño sea valido
                            var valor = Operacion(_instruccion.expresion, _ambito)//valor ingresado a la posicion del vector
                            if (simbolo.tipo === valor.tipo) {
                                simbolo.valor[fila.valor] = valor.valor
                                _ambito.actualizar(simbolo.id, simbolo)
                                return null;
                            } else {
                                //--------------Agregando Errores a Tabla de Errores---------------------------
                                var addError = {
                                    tipo: "Error Semantico",
                                    descripcion: "No es posible asignar un valor de tipo " + valor.tipo + " a la variable '" + simbolo.id + "' que es de tipo " + simbolo.tipo,
                                    fila: _instruccion.linea,
                                    columna: _instruccion.columna
                                }
                                reporte.AgregarError(addError);
                                return "Error: No es posible asignar un valor de tipo " + valor.tipo + " a la variable '" + simbolo.id + "' que es de tipo " + simbolo.tipo + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                            }
                        } else {
                            //--------------Agregando Errores a Tabla de Errores---------------------------
                            var addError = {
                                tipo: "Error Semantico",
                                descripcion: "La posicion del vector ingresada excede el tamaño del vector  " + simbolo.id,
                                fila: _instruccion.linea,
                                columna: _instruccion.columna
                            }
                            reporte.AgregarError(addError);
                            return "La posicion del vector ingresada excede el tamaño del vector  " + simbolo.id + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                        }
                    } else {
                        //--------------Agregando Errores a Tabla de Errores---------------------------
                        var addError = {
                            tipo: "Error Semantico",
                            descripcion: "La posicion del vector " + simbolo.id + " no es un entero",
                            fila: _instruccion.linea,
                            columna: _instruccion.columna
                        }
                        reporte.AgregarError(addError);
                        return "La posicion del vector " + simbolo.id + " no es un entero" + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                    }
                } else {
                    var addError = {
                        tipo: "Error Semantico",
                        descripcion: "La variable " + simbolo.id + " no es un vector",
                        fila: _instruccion.linea,
                        columna: _instruccion.columna
                    }
                    reporte.AgregarError(addError);
                    return "La variable " + simbolo.id + " no es un vector" + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
                }
            }
        } else {
            var valor = Operacion(_instruccion.expresion, _ambito)
            var simbolo = _ambito.getSimbolo(id)
            var tipos = {
                tipoSimbolo: simbolo.tipo,
                tipoNuevoValor: valor.tipo
            }
            if (tipos.tipoSimbolo === tipos.tipoNuevoValor) {
                simbolo.valor = valor.valor
                _ambito.actualizar(id, simbolo)
                return null
            }
            //--------------Agregando Errores a Tabla de Errores---------------------------
            var addError = {
                tipo: "Error Semantico",
                descripcion: "No es posible asignar un valor de tipo " + tipos.tipoNuevoValor + " a la variable '" + id + "' que es de tipo " + tipos.tipoSimbolo,
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarError(addError);
            return "Error: No es posible asignar un valor de tipo " + tipos.tipoNuevoValor + " a la variable '" + id + "' que es de tipo " + tipos.tipoSimbolo + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+" \n";
        }
    }
    //--------------Agregando Errores a Tabla de Errores---------------------------
    var addError = {
        tipo: "Error Semantico",
        descripcion: `La variable '${String(id)}' no existe`,
        fila: _instruccion.linea,
        columna: _instruccion.columna
    }
    reporte.AgregarError(addError);
    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna} \n`
}

module.exports = Asignacion