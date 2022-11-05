const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO = require("../Enums/Tipo");
const Operacion = require("../Operacion/Operacion");
const Reporte = require("../Reporte/Reporte")
function DeclaracionVector(_instruccion, _ambito) {
    var reporte = new Reporte();
    if (_instruccion.tipo_dato2 != null) {//Vector sin elementos
        if (_instruccion.tipo_dato === _instruccion.tipo_dato2) {
            var op = Operacion(_instruccion.valor, _ambito)

            tipo = op.tipo;
            if (tipo === TIPO_DATO.ENTERO) {
                var valor = new Array(op.valor);
                for (let i = 0; i < valor.length; i++) {
                    if (_instruccion.tipo_dato === TIPO_DATO.BOOLEANO) {
                        valor[i] = true;
                    } else if (_instruccion.tipo_dato === TIPO_DATO.ENTERO) {
                        valor[i] = 0;
                    } else if (_instruccion.tipo_dato === TIPO_DATO.DECIMAL) {
                        valor[i] = 0.0;
                    } else if (_instruccion.tipo_dato === TIPO_DATO.CARACTER) {
                        valor[i] = '';
                    } else if (_instruccion.tipo_dato === TIPO_DATO.CADENA) {
                        valor[i] = ""
                    }
                }

            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible declarar el tamaño del vector, el tamaño ingresado es de tipo " + op.tipo,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error Semantico: No es posible declarar el tamaño del vector, el tamaño ingresado es de tipo " + op.tipo + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
            const nuevoSimbolo = new Simbolo(_instruccion.id, valor, _instruccion.tipo_dato, TIPO.VECTOR, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
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
                tipo: "Vector",
                tipo2: _instruccion.tipo_dato,
                entorno: "",
                fila: _instruccion.linea, 
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        } else {
            var addError = {
                tipo: "Error Semantico",
                descripcion: "Error Semantico: No es posible declarar un vector, los tipos de datos no coinciden " + _instruccion.tipo_dato + " con " + _instruccion.tipo_dato2,
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarError(addError);
            return "Error Semantico: No es posible declarar un vector, los tipos de datos no coinciden " + _instruccion.tipo_dato + " con " + _instruccion.tipo_dato2 + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        }
    } else {//Vector con elementos
        var datos = new Array(_instruccion.valor.length);
        for (let i = 0; i < _instruccion.valor.length; i++) {
            var op = Operacion(_instruccion.valor[i], _ambito)            
            if (op.tipo === _instruccion.tipo_dato) {
                datos[i] = op.valor;
            } else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible asignar un valor de tipo " + op.tipo + " al vector " + _instruccion.id + " que es de tipo " + _instruccion.tipo_dato,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error: No es posible asignar un valor de tipo " + op.tipo + " al vector " + _instruccion.id + " que es de tipo " + _instruccion.tipo_dato + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, datos, _instruccion.tipo_dato, TIPO.VECTOR, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
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
            tipo: "Vector",
            tipo2: _instruccion.tipo_dato,
            entorno: "",
            fila: _instruccion.linea, 
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
    }
}

module.exports = DeclaracionVector