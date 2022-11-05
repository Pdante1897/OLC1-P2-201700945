const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO = require("../Enums/Tipo");
const Operacion = require("../Operacion/Operacion");
const Reporte = require("../Reporte/Reporte")
function DecParametro(_instruccion, _ambito) {
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
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.ENTERO,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.ENTERO + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
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
            tipo2: "ENTERO",
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
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
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
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
            tipo2: "DECIMAL",
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
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
                    descripcion: "No es posible asignar un valor de tipo " + tipo + " a la variable\n" + _instruccion.id + " que es de tipo " + TIPO_DATO.CADENA,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable\n" + _instruccion.id + " que es de tipo " + TIPO_DATO.CADENA + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
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
            tipo2: "CADENA",
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
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
                    descripcion: "La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n" + _instruccion.id + " que es de tipo " + TIPO_DATO.CARACTER + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
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
            tipo2: "CARACTER",
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
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
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BOOLEANO, TIPO.VARIABLE, _instruccion.linea, _instruccion.columna)
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
            tipo2: "BOOLEAN",
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
        return null
    } else if (_instruccion.tipo_dato === "VECTOR") {
        var op = Operacion(_instruccion.valor, _ambito)
        const nuevoSimbolo = new Simbolo(_instruccion.id, op.valor, op.tipo, TIPO.VECTOR, _instruccion.linea, _instruccion.columna)
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
            tipo: TIPO.VECTOR,
            tipo2: op.tipo,
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
        return null
    }
    else if (_instruccion.tipo_dato === "VECTOR_2D") {
        var op = Operacion(_instruccion.valor, _ambito)
        const nuevoSimbolo = new Simbolo(_instruccion.id, op.valor, op.tipo, TIPO.VECTOR_2DIMENSIONES, _instruccion.linea, _instruccion.columna)
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
            tipo: TIPO.VECTOR,
            tipo2: op.tipo,
            entorno: "",
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
        return null
    }

}

module.exports = DecParametro