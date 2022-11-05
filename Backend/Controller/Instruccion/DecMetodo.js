const Metodo = require("../Ambito/Metodo")
const Reporte = require("../Reporte/Reporte")
function DecMetodo(_instruccion, _ambito){
     var reporte = new Reporte();
    const nuevoMetodo = new Metodo (_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones,_instruccion.tipom,_instruccion.retorno, _instruccion.linea, _instruccion.columna)
    
    if(_ambito.existeSimbolo(nuevoMetodo.id)!=false){
        return `Error: No es posible declarar el metodo con el nombre de una varible existente '${nuevoMetodo.id}'  Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    if(_ambito.existeMetodo(nuevoMetodo.id)!=false){
        return `Error: El metodo ya existe '${nuevoMetodo.id}'  Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    _ambito.agregarMetodo(nuevoMetodo.id, nuevoMetodo)
    //-------------Agregando a la Tabla-------------------
    var addSimbolo = {
        id: nuevoMetodo.id,
        tipo: _instruccion.tipom,
        tipo2: _instruccion.retorno,
        entorno: "",
        fila: _instruccion.linea, 
        columna: _instruccion.columna
    }
    reporte.AgregarSimbolo(addSimbolo);
    return null
}
module.exports = DecMetodo