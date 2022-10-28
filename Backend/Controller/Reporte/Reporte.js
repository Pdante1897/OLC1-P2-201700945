class Reporte{
    constructor(){
        if(Reporte.instancia){
            return Reporte.instancia;
        }
        this.tablaSimbolos = [];
        this.tablaErrores = [];
        Reporte.instancia = this;
    }

    AgregarSimbolo(_s){
        this.tablaSimbolos.push(_s);
    }

    AgregarError(_e){
        this.tablaErrores.push(_e)
    }
    Eliminar(){
        this.tablaSimbolos.length =0;
    }
} 

module.exports = Reporte;