const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO = require("../Enums/Tipo");
const Operacion = require("../Operacion/Operacion");
const Reporte = require("../Reporte/Reporte")

function Declaracion(_instruccion, _ambito) {
    var reporte = new Reporte();
    if (_instruccion.tipo_dato === TIPO_DATO.ENTERO) {
        var valor = 0
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.ENTERO) {
                valor = op.valor;
            }
            else {
                //--------------Agregando Errores a Tabla de Errores---------------------------
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.ENTERO,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.ENTERO + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }

        for (let i = 0; i < _instruccion.id.length; i++) {
            const nuevoSimbolo = new Simbolo(_instruccion.id[i], valor, TIPO_DATO.ENTERO, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
            }
            _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //-------------Agregando a la Tabla-------------------
            var addSimbolo = {
                id: nuevoSimbolo.id,
                tipo: "Variable",
                tipo2: "Int",
                entorno: "",
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        }

        return null
    }
    else if (_instruccion.tipo_dato === TIPO_DATO.DECIMAL) {
        var valor = 0.0
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.DECIMAL) {
                valor = op.valor;
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable\n" + _instruccion.id + " que es de tipo " + TIPO_DATO.DECIMAL,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
               return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable\n" + _instruccion.id + " que es de tipo " + TIPO_DATO.DECIMAL + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        for (let i = 0; i < _instruccion.id.length; i++) {
            const nuevoSimbolo = new Simbolo(_instruccion.id[i], valor, TIPO_DATO.DECIMAL, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
            }
            _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //-------------Agregando a la Tabla-------------------
            var addSimbolo = {
                id: nuevoSimbolo.id,
                tipo: "Variable",
                tipo2: "Double",
                entorno: "",
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        }

        return null
    }
    else if (_instruccion.tipo_dato === TIPO_DATO.CADENA) {
        valor = ""
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.CADENA) {
                valor = String(op.valor);
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable " + _instruccion.id + " que es de tipo " + TIPO_DATO.CADENA,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
               return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable " + _instruccion.id + " que es de tipo " + TIPO_DATO.CADENA + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        for (let i = 0; i < _instruccion.id.length; i++) {
            const nuevoSimbolo = new Simbolo(_instruccion.id[i], valor, TIPO_DATO.CADENA, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "Error: La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
            }
            _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //-------------Agregando a la Tabla-------------------
            var addSimbolo = {
                id: nuevoSimbolo.id,
                tipo: "Variable",
                tipo2: "String",
                entorno: "",
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        }

        return null
    }
    else if (_instruccion.tipo_dato === TIPO_DATO.CARACTER) {
        var valor = ''
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.CARACTER) {
                valor = String(op.valor);
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.CARACTER,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.CARACTER + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        for (let i = 0; i < _instruccion.id.length; i++) {
            const nuevoSimbolo = new Simbolo(_instruccion.id[i], valor, TIPO_DATO.CARACTER, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "Error: La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
            }
            _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //-------------Agregando a la Tabla-------------------
            var addSimbolo = {
                id: nuevoSimbolo.id,
                tipo: "Variable",
                tipo2: "Char",
                entorno: "",
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        }

        return null
    }
    else if (_instruccion.tipo_dato === TIPO_DATO.BOOLEANO) {
        var valor = true
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.BOOLEANO) {
                valor = Boolean(op.valor);
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.BOOLEANO,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.BOOLEANO + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        for (let i = 0; i < _instruccion.id.length; i++) {
            const nuevoSimbolo = new Simbolo(_instruccion.id[i], valor, TIPO_DATO.BOOLEANO, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
            }
            _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //-------------Agregando a la Tabla-------------------
            var addSimbolo = {
                id: nuevoSimbolo.id,
                tipo: "Variable",
                tipo2: "Boolean",
                entorno: "",
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        }

        return null
    }

}

module.exports = Declaracion