const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO = require("../Enums/Tipo");
const Operacion = require("../Operacion/Operacion");
const Reporte = require("../Reporte/Reporte")

function DeclaracionVector2Dimensiones(_instruccion, _ambito) {
    var reporte = new Reporte();
    if (_instruccion.tipo_dato2 != null) {//Vector sin elementos
        if (_instruccion.tipo_dato === _instruccion.tipo_dato2) {
            var op = Operacion(_instruccion.valor, _ambito)//Obtener valor fila
            var op2 = Operacion(_instruccion.valor2, _ambito)//Obtener valor columna           
            tipo = op.tipo;
            tipo2 = op2.tipo;
            if (tipo === TIPO_DATO.ENTERO) {
                if (tipo2 === TIPO_DATO.ENTERO) {
                    var valor = new Array(op.valor)
                    for(let i=0; i<op.valor;i++){
                        valor[i]=new Array(op2.valor) 
                    }
                    //Llenando vector
                    for(let i=0; i<op.valor;i++){
                        for(let j=0; j<op2.valor;j++){
                            if(_instruccion.tipo_dato === TIPO_DATO.ENTERO){
                                valor[i][j]=0;
                            }
                            else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
                                valor[i][j]="";
                            }
                            else if(_instruccion.tipo_dato === TIPO_DATO.BOOLEANO){
                                valor[i][j]=true;
                            }
                            else if(_instruccion.tipo_dato === TIPO_DATO.CARACTER){
                                valor[i][j]='';
                            }
                            else if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
                                valor[i][j]=0.0;
                            }
                        }
                    }
                }
                else {
                    var addError = {
                        tipo: "Error Semantico",
                        descripcion: "No es posible declarar el tamaño del vector, la columna ingresada es de tipo " + op2.tipo,
                        fila: _instruccion.linea,
                        columna: _instruccion.columna
                    }
                    reporte.AgregarError(addError);
                    return "Error Semantico: No es posible declarar el tamaño del vector, la columna ingresada es de tipo " + op2.tipo + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
                }
            }
            else {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible declarar el tamaño del vector, la fila ingresada es de tipo " + op.tipo,
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error Semantico: No es posible declarar el tamaño del vector, la fila ingresada es de tipo " + op.tipo + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }
            const nuevoSimbolo = new Simbolo(_instruccion.id, valor, _instruccion.tipo_dato, TIPO.VECTOR_2DIMENSIONES, _instruccion.linea, _instruccion.columna)
            if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "La variable '" + nuevoSimbolo.id + "' ya existe",
                    fila: nuevoSimbolo.linea,
                    columna: nuevoSimbolo.columna
                }
                reporte.AgregarError(addError);
                return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
            }
            _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //-------------Agregando a la Tabla-------------------
            var addSimbolo = {
                id: nuevoSimbolo.id,
                tipo: "Vector_2Dimensiones",
                tipo2: _instruccion.tipo_dato,
                entorno: "",
                fila: _instruccion.linea, 
                columna: _instruccion.columna
            }
            reporte.AgregarSimbolo(addSimbolo);
        } else {
            var addError = {
                tipo: "Error Semantico",
                descripcion: "No es posible declarar un vector, los tipos de datos no coinciden " + _instruccion.tipo_dato + " con " + _instruccion.tipo_dato2,
                fila: _instruccion.linea,
                columna: _instruccion.columna
            }
            reporte.AgregarError(addError);
            return "Error Semantico: No es posible declarar un vector, los tipos de datos no coinciden " + _instruccion.tipo_dato + " con " + _instruccion.tipo_dato2 + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        }
    } else {//Vector con elementos
        var fila = _instruccion.valor.length
        var columna = _instruccion.valor[0].length
        var datos=new Array(fila) 
        for (let i = 0; i < fila; i++) {
            if(_instruccion.valor[i].length!= columna){
                var addError = {
                    tipo: "Error Semantico",
                    descripcion: "No es posible declarar un vector, las columnas no son iguales",
                    fila: _instruccion.linea,
                    columna: _instruccion.columna
                }
                reporte.AgregarError(addError);
                return "Error Semantico: No es posible declarar un vector, las columnas no son iguales ...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
            }else{
                datos[i]=new Array(columna)
            }            
        }
        for(let i=0;i<fila;i++){
            for(let j=0;j<columna;j++){
                var op = Operacion(_instruccion.valor[i][j], _ambito)
                if(op.tipo===_instruccion.tipo_dato){
                    datos[i][j]=op.valor;
                }else{
                    var addError = {
                        tipo: "Error Semantico",
                        descripcion: "No es posible asignar un valor de tipo " + op.tipo + " al vector " + _instruccion.id + " que es de tipo " + _instruccion.tipo_dato,
                        fila: _instruccion.linea,
                        columna: _instruccion.columna
                    }
                    reporte.AgregarError(addError);
                    return "Error: No es posible asignar un valor de tipo " + op.tipo + " al vector " + _instruccion.id + " que es de tipo " + _instruccion.tipo_dato + "...Linea: " + _instruccion.linea + " Columna: " + _instruccion.columna+"\n"
                }

            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, datos, _instruccion.tipo_dato, TIPO.VECTOR_2DIMENSIONES, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            var addError = {
                tipo: "Error Semantico",
                descripcion: "No es posible asignar un valor de tipo " + op.tipo + " al vector " + _instruccion.id + " que es de tipo " + _instruccion.tipo_dato,
                fila: nuevoSimbolo.linea,
                columna: nuevoSimbolo.columna
            }
            reporte.AgregarError(addError);
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe...Linea: " + nuevoSimbolo.linea + " Columa: " + nuevoSimbolo.columna + "\n"
        }
        _ambito.agregarSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //-------------Agregando a la Tabla-------------------
        var addSimbolo = {
            id: nuevoSimbolo.id,
            tipo: "Vector_2Dimensiones",
            tipo2: _instruccion.tipo_dato,
            entorno: "",
            fila: _instruccion.linea, 
            columna: _instruccion.columna
        }
        reporte.AgregarSimbolo(addSimbolo);
        
    }

}
module.exports = DeclaracionVector2Dimensiones