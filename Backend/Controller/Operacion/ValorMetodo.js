const Ambito = require("../Ambito/Ambito");
const Reporte = require("../Reporte/Reporte")

function ValorMetodo(_expresion, _ambito) {
    if (_ambito.existeMetodo(_expresion.nombre)) {
        const metodo = _ambito.getMetodo(_expresion.nombre)
        if (metodo.tipometodo === "FUNCION") {
            const Run = require("../Instruccion/Run")
            var result = Run(_expresion, _ambito);
            if (metodo.retorno === result.expresionRetorno.tipo) {
                return {
                    valor: result.expresionRetorno.valor,
                    tipo: result.expresionRetorno.tipo,
                    linea: result.expresionRetorno.linea,
                    columna: result.expresionRetorno.columna
                }
            }
            var reporte = new Reporte();
            var addError = {
                tipo: "Error Semantico",
                descripcion: "Error Semantico: La funcion es de tipo " + metodo.retorno + " y la expresion del retorno es de tipo " + result.expresionRetorno.tipo,
                fila: _expresion.linea,
                columna: _expresion.columna
            }
            reporte.AgregarError(addError);
            return {
                valor: "Error Semantico: La funcion es de tipo " + metodo.retorno + " y la expresion del retorno es de tipo " + result.expresionRetorno.tipo + " Fila: " + _expresion.linea + " Columna: " + _expresion.columna + "\n",
                tipo: null,
                linea: _expresion.linea,
                columna: _expresion.columna
            }

        } else {
            var reporte = new Reporte();
            var addError = {
                tipo: "Error Semantico",
                descripcion: "Error Semantico: El id " + _expresion.nombre + " es un metodo que retorna nulo ",
                fila: _expresion.linea,
                columna: _expresion.columna
            }
            reporte.AgregarError(addError);
            return {
                valor: "Error Semantico: El id " + _expresion.nombre + " es un metodo que retorna nulo Fila: " + _expresion.linea + " Columna: " + _expresion.columna + "\n",
                tipo: null,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
        }
    } else {
        var reporte = new Reporte();
        var addError = {
            tipo: "Error Semantico",
            descripcion: "No existe el metodo" + _expresion.nombre,
            fila: _expresion.linea,
            columna: _expresion.columna
        }
        reporte.AgregarError(addError);
        return {
            valor: "Error Semantico: No existe el metodo " + _expresion.nombre + " Fila: " + _expresion.linea + " Columna: " + _expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
}

module.exports = ValorMetodo