class Metodo{
    constructor(_id, _lista_parametros, _instrucciones,_tipometodo,_retorno, _linea, _columna){
        this.id = _id;
        this.lista_parametros = _lista_parametros;
        this.instrucciones = _instrucciones;
        this.tipometodo = _tipometodo;
        this.retorno = _retorno;
        this.linea = _linea;
        this.columna = _columna;
    }
}

module.exports = Metodo