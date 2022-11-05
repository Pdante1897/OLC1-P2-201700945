const Operacion = require("../Operacion/Operacion")

function Return(_instrucciones, _ambito) {
    if (_instrucciones.expresion != null) {
        var op = Operacion(_instrucciones.expresion, _ambito)
        return op
    }

}

module.exports = Return