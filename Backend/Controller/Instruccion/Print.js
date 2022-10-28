const procesarCadena = require("../Operacion/procesarCadena")

function Print(_instruccion, _ambito){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    return cadena
}

module.exports = Print