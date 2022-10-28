const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Reporte = require("../Reporte/Reporte")
function Incremento(_instruccion, _ambito){
    var reporte = new Reporte();
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    var optipo = _ambito.getSimbolo(id)
    if(existe){
        if(optipo.tipo == "ENTERO" ||optipo.tipo == "DECIMAL"){
            if(_instruccion.tipo_op === TIPO_OPERACION.INCREMENTO){
                var simbolo= _ambito.getSimbolo(id)
                simbolo.valor = Number(simbolo.valor) + 1
                _ambito.actualizar(id, simbolo)
                return null
            }
            else if(_instruccion.tipo_op === TIPO_OPERACION.DECREMENTO){
                var simbolo= _ambito.getSimbolo(id)
                simbolo.valor = Number(simbolo.valor) - 1
                _ambito.actualizar(id, simbolo)
                return null
            }
        }
        var addError = {
            tipo: "Error Semantico",
            descripcion: 'No se puede realizar la operacion '+_instruccion.tipo_op,
            fila: _instruccion.linea,
            columna: _instruccion.columna
        }
        reporte.AgregarError(addError);
        return 'Error semántico: no se puede realizar la operacion '+_instruccion.tipo_op+'... Linea: '+_instruccion.linea+" Columna: "+_instruccion.columna+"\n"  
        
    }
    var addError = {
        tipo: "Error Semantico",
        descripcion: `La variable '${String(id)}' no existe`,
        fila: _instruccion.linea,
        columna: _instruccion.columna
    }
    reporte.AgregarError(addError);
    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`+"\n"
}

module.exports = Incremento