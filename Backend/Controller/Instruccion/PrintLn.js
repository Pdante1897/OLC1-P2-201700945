const procesarCadena = require("../Operacion/procesarCadena")

function PrintLn(_instruccion, _ambito){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor+'\n'
    return cadena
}

module.exports = PrintLn