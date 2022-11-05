const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO = require("../Enums/Tipo");
const Operacion = require("../Operacion/Operacion");
const Reporte = require("../Reporte/Reporte");
const TIPO_VALOR = require("../Enums/TipoValor");

function DeclaracionVectorChar(_instruccion, _ambito){
    var reporte = new Reporte();
    if(_instruccion.tipo_dato === TIPO_DATO.CARACTER){
        var op = Operacion(_instruccion.valor, _ambito)
        if(op.tipo === "CADENA"){
            var valor = Array.from(op.valor);
            const nuevoSimbolo = new Simbolo(_instruccion.id, valor, _instruccion.tipo_dato, TIPO.VECTOR, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Fila: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
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
        }else{
            var addError = {
                tipo: "Error Semantico",
                descripcion: "No se puede realizar la opereacion ToCharArray a un valor diferente a un STRING ",
                fila: nuevoSimbolo.linea,
                columna: nuevoSimbolo.columna
            }
            reporte.AgregarError(addError);
            return "Error: No se puede realizar la opereacion ToCharArray a un valor diferente a un STRING   Fila: "  + _instruccion.linea + " Columa: " + _instruccion.columna + "\n"
        }
    }else{
        var addError = {
            tipo: "Error Semantico",
            descripcion: "No se puede asignar un Caracter al vector que es de tipo"+ _instruccion.tipo_dato,
            fila: nuevoSimbolo.linea,
            columna: nuevoSimbolo.columna
        }
        reporte.AgregarError(addError);
        return "No se puede asignar un Caracter al vector que es de tipo"+ _instruccion.tipo_dato+"   Fila: " + _instruccion.linea + " Columa: " + _instruccion.columna + "\n"
    }
}

module.exports = DeclaracionVectorChar