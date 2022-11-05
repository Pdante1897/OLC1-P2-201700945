class Ambito {
    constructor(_anterior) {
        this.anterior = _anterior
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();
    }

    agregarSimbolo(_s, _simbolo) {
        this.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
    }

    getSimbolo(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }

    existeSimbolo(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

    actualizar(_s, _simbolo) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
            if (encontrado != null) {
                e.tablaSimbolos.set(_s, _simbolo)
                return true;
            }
        }
        return false
    }

    //Tabla de Metodos
    agregarMetodo(_m, _metodo) {
        this.tablaMetodos.set(_m.toLowerCase(), _metodo)
    }

    getMetodo(_m) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_m.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }

    existeMetodo(_m) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_m.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

    existeSimboloAmbitoActual(_s){
        var encontrado = this.tablaSimbolos.get(_s.toLowerCase())
        if (encontrado != null) {
            return true
        }
        return false
    }

}

module.exports = Ambito