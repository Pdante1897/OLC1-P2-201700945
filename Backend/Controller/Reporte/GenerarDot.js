const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor");
class GenerarDot {
    constructor(_raiz) {
        this.grafo = "";
        this.raiz = _raiz;
        this.cont = 0;
    }

    dot() {
        this.grafo += "node[shape = \"box\"];";
        this.grafo += "Nodo0[label = \" INICIO\"]; \n";
        this.cont = 1;
        this.recorrerAST("Nodo0", this.raiz);
        return this.grafo;
    }
    recorrerAST(_padre, _hijo) {
        _hijo.forEach(instruccion => {
            if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarDeclaracion(instruccion, idHijo);
            } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"ASIGNACION\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarAsignacion(instruccion, idHijo);
            } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION_VECTOR\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarDeclaracionVector(instruccion, idHijo);
            } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_CHAR) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION_VECTOR\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarDeclaracionVectorChar(instruccion, idHijo);
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_2DIMENSIONES) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION_VECTOR2D\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarDeclaracionVector2Dimensiones(instruccion, idHijo);
            } else if (instruccion.tipo === TIPO_INSTRUCCION.RUN) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"RUN\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarRun(instruccion, idHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO) {
                if (instruccion.tipom === "FUNCION") {
                    var idHijo = "Nodo" + this.cont;
                    this.cont++;
                    this.grafo += idHijo + "[label= \"DEC_FUNCION\"]; \n";
                    this.grafo += _padre + "->" + idHijo + ";"
                } else {
                    var idHijo = "Nodo" + this.cont;
                    this.cont++;
                    this.grafo += idHijo + "[label= \"DEC_METODO\"]; \n";
                    this.grafo += _padre + "->" + idHijo + ";"
                }
                this.graficarMetodo(instruccion, idHijo)

            }
        })
    }
    graficarDeclaracion(_instruccion, _padre) {
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"

        var tipoVar = "Nodo" + this.cont;
        this.grafo += tipoVar + "[label = \" " + _instruccion.tipo_dato + " \"]; \n";
        this.grafo += idHijo + "->" + tipoVar + ";\n";
        this.cont++;

        for (var i = 0; i < _instruccion.id.length; i++) {
            var nombreVar = "Nodo" + this.cont;
            this.grafo += nombreVar + " [label= \" " + _instruccion.id[0] + " \" ]; \n";
            this.grafo += _padre + "->" + nombreVar + ";\n";
            this.cont++;
        }
        if (_instruccion.valor != null) {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"EXPRESION\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            this.graficarOperacion(_instruccion.valor, idNodo);
        }
    }
    graficarDeclaracionVector(_instruccion, _padre) {
        //Tipo de Dato 1
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"

        var tipoVar = "Nodo" + this.cont;
        this.grafo += tipoVar + "[label = \" " + _instruccion.tipo_dato + " \"]; \n";
        this.grafo += idHijo + "->" + tipoVar + ";\n";
        this.cont++;
        // Identificador del Vector
        var nombreVar = "Nodo" + this.cont;
        this.grafo += nombreVar + " [label= \" " + _instruccion.id + "[ ] \" ]; \n";
        this.grafo += _padre + "->" + nombreVar + ";\n";
        this.cont++;
        //Tipo de Dato 2 Si existe
        if (_instruccion.tipo_dato2 != null) {
            var idn = "Nodo" + this.cont
            this.cont++;
            this.grafo += idn + "[label= \"new\"]; \n";
            this.grafo += _padre + "->" + idn + ";"

            var idHijo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
            this.grafo += _padre + "->" + idHijo + ";"

            var tipoVar = "Nodo" + this.cont;
            this.grafo += tipoVar + "[label = \" " + _instruccion.tipo_dato + " \"]; \n";
            this.grafo += idHijo + "->" + tipoVar + ";\n";
            this.cont++;
            if (_instruccion.valor != null) {
                var idNodo = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodo + "[label= \"[ EXPRESION ]\"]; \n";
                this.grafo += _padre + "->" + idNodo + ";"
                this.graficarOperacion(_instruccion.valor, idNodo);
            }
        } else {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"[ LISTA_VALORES ]\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            if (_instruccion.valor.length == 1) {
                this.graficarOperacion(_instruccion.valor, idNodo);
            } else {
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \"[\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
                for (let i = 0; i < _instruccion.valor.length; i++) {
                    var ex = "Nodo" + this.cont
                    this.cont++;
                    this.grafo += ex + "[label= \"EXPRESION\"]; \n";
                    this.grafo += idNodo + "->" + ex + ";"
                    this.graficarOperacion(_instruccion.valor[i], ex);
                }
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \"]\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
            }
        }


    }
    graficarDeclaracionVectorChar(_instruccion, _padre) {
        //Tipo de Dato 1
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"

        var tipoVar = "Nodo" + this.cont;
        this.grafo += tipoVar + "[label = \" " + _instruccion.tipo_dato + " \"]; \n";
        this.grafo += idHijo + "->" + tipoVar + ";\n";
        this.cont++;
        // Identificador del Vector
        var nombreVar = "Nodo" + this.cont;
        this.grafo += nombreVar + " [label= \" " + _instruccion.id + "[ ] \" ]; \n";
        this.grafo += _padre + "->" + nombreVar + ";\n";
        this.cont++;
        var nombreVar = "Nodo" + this.cont;
        this.grafo += nombreVar + " [label= \" " + "TOCHARARRAY" + "\" ]; \n";
        this.grafo += _padre + "->" + nombreVar + ";\n";
        this.cont++;
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"EXPRESION\"]; \n";
        this.grafo += nombreVar + "->" + idHijo + ";"
        this.graficarOperacion(_instruccion.valor, idHijo)

    }
    graficarDeclaracionVector2Dimensiones(_instruccion, _padre) {
        //Tipo de Dato 1
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"

        var tipoVar = "Nodo" + this.cont;
        this.grafo += tipoVar + "[label = \" " + _instruccion.tipo_dato + " \"]; \n";
        this.grafo += idHijo + "->" + tipoVar + ";\n";
        this.cont++;
        // Identificador del Vector
        var nombreVar = "Nodo" + this.cont;
        this.grafo += nombreVar + " [label= \" " + _instruccion.id + "[ ][ ] \" ]; \n";
        this.grafo += _padre + "->" + nombreVar + ";\n";
        this.cont++;
        //Tipo de Dato 2 Si existe
        if (_instruccion.tipo_dato2 != null) {
            var idn = "Nodo" + this.cont
            this.cont++;
            this.grafo += idn + "[label= \"new\"]; \n";
            this.grafo += _padre + "->" + idn + ";"

            var idHijo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
            this.grafo += _padre + "->" + idHijo + ";"

            var tipoVar = "Nodo" + this.cont;
            this.grafo += tipoVar + "[label = \" " + _instruccion.tipo_dato + " \"]; \n";
            this.grafo += idHijo + "->" + tipoVar + ";\n";
            this.cont++;
            if (_instruccion.valor != null) {
                var idNodo = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodo + "[label= \"[ EXPRESION ]\"]; \n";
                this.grafo += _padre + "->" + idNodo + ";"
                this.graficarOperacion(_instruccion.valor, idNodo);
            }
            if (_instruccion.valor2 != null) {
                var idNodo = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodo + "[label= \"[ EXPRESION ]\"]; \n";
                this.grafo += _padre + "->" + idNodo + ";"
                this.graficarOperacion(_instruccion.valor2, idNodo);
            }
        } else {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"[ LISTA_VALORES ]\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            if (_instruccion.valor.length == 1) {
                this.graficarOperacion(_instruccion.valor, idNodo);
            } else {
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \"[\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
                for (let i = 0; i < _instruccion.valor.length; i++) {
                    for (let j = 0; j < _instruccion.valor[0].length; j++) {
                        var ex = "Nodo" + this.cont
                        this.cont++;
                        this.grafo += ex + "[label= \"EXPRESION\"]; \n";
                        this.grafo += idNodo + "->" + ex + ";"
                        this.graficarOperacion(_instruccion.valor[i][j], ex);
                    }
                    if (i != _instruccion.valor.length - 1) {
                        //Separar por Coma
                        var idNodoC = "Nodo" + this.cont
                        this.cont++;
                        this.grafo += idNodoC + "[label= \"] , [\"]; \n";
                        this.grafo += idNodo + "->" + idNodoC + ";"
                    }
                }
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \"]\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
            }
        }

    }
    graficarAsignacion(_instruccion, _padre) {
        var nombreVar = "Nodo" + this.cont;
        this.grafo += nombreVar + " [label= \" " + _instruccion.id + " \" ]; \n";
        this.grafo += _padre + "->" + nombreVar + ";\n";
        this.cont++;
        //Si es un Vector de una Dimension
        if (_instruccion.fila != null) {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"[ EXPRESION ]\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            this.graficarOperacion(_instruccion.fila, idNodo);
        }
        if (_instruccion.columnaexp != null) {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"[ EXPRESION ]\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            this.graficarOperacion(_instruccion.columnaexp, idNodo);
        }
        var idNodo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idNodo + "[label= \"EXPRESION\"]; \n";
        this.grafo += _padre + "->" + idNodo + ";"
        this.graficarOperacion(_instruccion.expresion, idNodo);
    }
    graficarRun(_instruccion, _padre) {
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"run\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"

        var tipoVar = "Nodo" + this.cont;
        this.grafo += tipoVar + "[label = \" " + _instruccion.nombre + " \"]; \n";
        this.grafo += _padre + "->" + tipoVar + ";\n";
        this.cont++;
        if (_instruccion.lista_valores != null) {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"[ LISTA_VALORES ]\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            if (_instruccion.lista_valores.length == 1) {
                this.graficarOperacion(_instruccion.lista_valores[0], idNodo);
            } else {
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \"(\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
                for (let i = 0; i < _instruccion.lista_valores.length; i++) {
                    var ex = "Nodo" + this.cont
                    this.cont++;
                    this.grafo += ex + "[label= \"EXPRESION\"]; \n";
                    this.grafo += idNodo + "->" + ex + ";"
                    this.graficarOperacion(_instruccion.lista_valores[i], ex);
                }
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \")\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
            }
        }
    }
    graficarMetodo(_instruccion, _padre) {
        var idHijo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idHijo + "[label= \"" + _instruccion.nombre + "\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"
        var idC = "Nodo" + this.cont
        this.cont++;
        this.grafo += idC + "[label= \"" + "(" + "\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        if (_instruccion.lista_parametros != null) {
            var idParametros = "Nodo" + this.cont
            this.cont++;
            this.grafo += idParametros + "[label= \"" + "LISTA PARAMETROS" + "\"]; \n";
            this.grafo += _padre + "->" + idParametros + ";"
            for (let i = 0; i < _instruccion.lista_parametros.length; i++) {
                var idHijo = "Nodo" + this.cont
                this.cont++;
                this.grafo += idHijo + "[label= \"TIPO_DATO\"]; \n";
                this.grafo += idParametros + "->" + idHijo + ";"

                var tipoVar = "Nodo" + this.cont;
                this.grafo += tipoVar + "[label = \" " + _instruccion.lista_parametros[i].tipo_dato + " \"]; \n";
                this.grafo += idHijo + "->" + tipoVar + ";\n";
                this.cont++;

                var idV = "Nodo" + this.cont
                this.cont++;
                this.grafo += idV + "[label = \" " + _instruccion.lista_parametros[i].id + " \"]; \n";
                this.grafo += idParametros + "->" + idV + ";\n";
            }
        }
        var idCd = "Nodo" + this.cont
        this.cont++;
        this.grafo += idCd + "[label= \"" + ")" + "\"]; \n";
        this.grafo += _padre + "->" + idCd + ";"

        var retorno = "Nodo" + this.cont
        this.cont++;
        this.grafo += retorno + "[label= \"" + "TIPO_RETORNO" + "\"]; \n";
        this.grafo += _padre + "->" + retorno + ";"

        var retornod = "Nodo" + this.cont
        this.cont++;
        this.grafo += retornod + "[label= \"" + _instruccion.retorno + "\"]; \n";
        this.grafo += retorno + "->" + retornod + ";"

        if (_instruccion.instrucciones != null) {
            this.graficarInstrucciones(_instruccion.instrucciones, _padre)
        }

    }
    graficarInstrucciones(_instrucciones, _padre) {
        //Instrucciones
        var padreN = "Nodo" + this.cont
        this.cont++;
        this.grafo += padreN + "[label= \"" + "INSTRUCCIONES" + "\"]; \n";
        this.grafo += _padre + "->" + padreN + ";"
        for (let i = 0; i < _instrucciones.length; i++) {
            if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarDeclaracion(_instrucciones[i], idHijo);
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"ASIGNACION\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarAsignacion(_instrucciones[i], idHijo);
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION_VECTOR\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarDeclaracionVector(_instrucciones[i], idHijo);
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_CHAR) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION_VECTOR\"]; \n";
                this.grafo += _padre + "->" + idHijo + ";"
                this.graficarDeclaracionVectorChar(_instrucciones[i], idHijo);
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION_VECTOR_2DIMENSIONES) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DECLARACION_VECTOR2D\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarDeclaracionVector2Dimensiones(_instrucciones[i], idHijo);
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.PRINT) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"PRINT\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarPrint(_instrucciones[i], idHijo);
            }
            else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.PRINTLN) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"PRINTLN\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarPrint(_instrucciones[i], idHijo);
            }
            else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.IF) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"IF\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarIf(_instrucciones[i], idHijo)
            }
            else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.IFEL) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"IF_ELSE\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarifelse(_instrucciones[i], idHijo)
            }
            else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.IFELIFCONEL) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"IF_ELSEIF_ELSE\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarifelseif(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DOWHILE) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"DOWHILE\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarDoWhile(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.FOR) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"FOR\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarFor(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.IFELIF) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"IF_ELSEIF\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarifelseif(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.LLAMADA) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"LLAMADA\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarLlamada(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.SWITCH) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"SWITCH\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarSwitch(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.INCREMENTADOR) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"INCREMENTO/DECREMENTO\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarIncremento(_instrucciones[i], idHijo)
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.BREAK) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"BREAK\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                var h = "Nodo" + this.cont;
                this.cont++;
                this.grafo += h + "[label= \"break\"]; \n";
                this.grafo += idHijo + "->" + h + ";"
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.RETURN) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"RETURN\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                var go = "Nodo" + this.cont;
                this.cont++;
                this.grafo += go + "[label= \"return\"]; \n";
                this.grafo += idHijo + "->" + go + ";"
                if (_instrucciones[i].expresion != null) {
                    var idC = "Nodo" + this.cont;
                    this.cont++;
                    this.grafo += idC + "[label= \"EXPRESION\"]; \n";
                    this.grafo += idHijo + "->" + idC + ";"
                    this.graficarOperacion(_instrucciones[i].expresion, idC)
                }
            } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.WHILE) {
                var idHijo = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idHijo + "[label= \"WHILE\"]; \n";
                this.grafo += padreN + "->" + idHijo + ";"
                this.graficarWhile(_instrucciones[i], idHijo)
            }

        }

    }
    graficarWhile(_instruccion, _padre) {
        var idHijo = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idHijo + "[label= \"while\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"CONDICION\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_instruccion.expresion, idC)
        if (_instruccion.instrucciones != null) {
            var idCd = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idCd + "[label= \"INSTRUCCIONES_WHILE\"]; \n";
            this.grafo += _padre + "->" + idCd + ";"
            if (_instruccion.instrucciones != null) {
                this.graficarInstrucciones(_instruccion.instrucciones, idCd)
            }
        }

    }
    graficarIncremento(_instruccion, _padre) {
        if (_instruccion.tipo_op === "DECREMENTO") {
            var idC = "Nodo" + this.cont;
            this.cont++
            this.grafo += idC + "[label= \"DECREMENTO\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
            var v = "Nodo" + this.cont;
            this.cont++
            this.grafo += v + "[label= \"" + _instruccion.id + "--\"]; \n";
            this.grafo += idC + "->" + v + ";"
        } else {
            var idC = "Nodo" + this.cont;
            this.cont++
            this.grafo += idC + "[label= \"INCREMENTO\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
            var v = "Nodo" + this.cont;
            this.cont++
            this.grafo += v + "[label= \"" + _instruccion.id + "++\"]; \n";
            this.grafo += idC + "->" + v + ";"
        }
    }
    graficarSwitch(_instruccion, _padre) {
        var idHijo = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idHijo + "[label= \"switch\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"
        var idHijo = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idHijo + "[label= \"EXPRESION\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"
        this.graficarOperacion(_instruccion.expresion, idHijo)
        var idHijo = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idHijo + "[label= \"LISTA_CASE\"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"
        if (_instruccion.lista_case != null) {
            for (let i = 0; i < _instruccion.lista_case.length; i++) {
                var c = "Nodo" + this.cont;
                this.cont++;
                this.grafo += c + "[label= \"CASE\"]; \n";
                this.grafo += idHijo + "->" + c + ";"
                var h = "Nodo" + this.cont;
                this.cont++;
                this.grafo += h + "[label= \"case\"]; \n";
                this.grafo += c + "->" + h + ";"
                var ex = "Nodo" + this.cont;
                this.cont++;
                this.grafo += ex + "[label= \"EXPRESION\"]; \n";
                this.grafo += c + "->" + ex + ";"
                this.graficarOperacion(_instruccion.lista_case[i].expresion, ex)
                var ex = "Nodo" + this.cont;
                this.cont++;
                this.grafo += ex + "[label= \"INSTRUCCION_CASE\"]; \n";
                this.grafo += c + "->" + ex + ";"
                this.graficarInstrucciones(_instruccion.lista_case[i].instrucciones, ex)
            }
        }
        if (_instruccion.instruccion_default != null) {
            var idHijo = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idHijo + "[label= \"DEFAULT\"]; \n";
            this.grafo += _padre + "->" + idHijo + ";"
            var h = "Nodo" + this.cont;
            this.cont++;
            this.grafo += h + "[label= \"default\"]; \n";
            this.grafo += idHijo + "->" + h + ";"
            var h = "Nodo" + this.cont;
            this.cont++;
            this.grafo += h + "[label= \"INSTRUCCIONES_DEFAULT\"]; \n";
            this.grafo += idHijo + "->" + h + ";"
            this.graficarInstrucciones(_instruccion.instruccion_default, h)

        }

    }
    graficarLlamada(_instruccion, _padre) {
        var idHijo = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idHijo + "[label = \" " + _instruccion.nombre + " \"]; \n";
        this.grafo += _padre + "->" + idHijo + ";"
        if (_instruccion.lista_valores != null) {
            var idNodo = "Nodo" + this.cont
            this.cont++;
            this.grafo += idNodo + "[label= \"[ LISTA_VALORES ]\"]; \n";
            this.grafo += _padre + "->" + idNodo + ";"
            if (_instruccion.lista_valores.length == 1) {
                this.graficarOperacion(_instruccion.lista_valores[0], idNodo);
            } else {
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \"(\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
                for (let i = 0; i < _instruccion.lista_valores.length; i++) {
                    var ex = "Nodo" + this.cont
                    this.cont++;
                    this.grafo += ex + "[label= \"EXPRESION\"]; \n";
                    this.grafo += idNodo + "->" + ex + ";"
                    this.graficarOperacion(_instruccion.lista_valores[i], ex);
                }
                var idNodoC = "Nodo" + this.cont
                this.cont++;
                this.grafo += idNodoC + "[label= \")\"]; \n";
                this.grafo += idNodo + "->" + idNodoC + ";"
            }
        }
    }
    graficarFor(_instruccion, _padre) {
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"for\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        if (_instruccion.asignacion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var idC = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idC + "[label= \"ASIGNACION\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
            this.graficarAsignacion(_instruccion.asignacion, idC)
        } else {
            var idC = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idC + "[label= \"DECLARACION\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
            this.graficarDeclaracion(_instruccion.asignacion, idC)
        }

        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"CONDICION\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_instruccion.condicion, idC)
        var idaC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idaC + "[label= \"ACTUALIZACION\"]; \n";
        this.grafo += _padre + "->" + idaC + ";"
        if (_instruccion.actualizacion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var idC = "Nodo" + this.cont;
            this.cont++
            this.grafo += idC + "[label= \"ASIGNACION\"]; \n";
            this.grafo += idaC + "->" + idC + ";"
            this.graficarAsignacion(_instruccion.actualizacion, idC)
        }
        else if (_instruccion.actualizacion.tipo === TIPO_INSTRUCCION.INCREMENTADOR) {
            if (_instruccion.actualizacion.tipo_op === "DECREMENTO") {
                var idC = "Nodo" + this.cont;
                this.cont++
                this.grafo += idC + "[label= \"DECREMENTO\"]; \n";
                this.grafo += idaC + "->" + idC + ";"
                var v = "Nodo" + this.cont;
                this.cont++
                this.grafo += v + "[label= \"" + _instruccion.actualizacion.id + "--\"]; \n";
                this.grafo += idC + "->" + v + ";"
            } else {
                var idC = "Nodo" + this.cont;
                this.cont++
                this.grafo += idC + "[label= \"INCREMENTO\"]; \n";
                this.grafo += idaC + "->" + idC + ";"
                var v = "Nodo" + this.cont;
                this.cont++
                this.grafo += v + "[label= \"" + _instruccion.actualizacion.id + "++\"]; \n";
                this.grafo += idC + "->" + v + ";"
            }
        }
        if (_instruccion.instrucciones != null) {
            var idCd = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idCd + "[label= \"INSTRUCCIONES_FOR\"]; \n";
            this.grafo += _padre + "->" + idCd + ";"
            if (_instruccion.instrucciones != null) {
                this.graficarInstrucciones(_instruccion.instrucciones, idCd)
            }
        }

    }
    graficarIf(_instruccion, _padre) {
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"if\"]; \n";
        this.grafo += _padre + "->" + idC + ";"

        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"CONDICION\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_instruccion.expresion, idC)
        var idCd = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idCd + "[label= \"INSTRUCCIONES_IF\"]; \n";
        this.grafo += _padre + "->" + idCd + ";"
        if (_instruccion.instrucciones != null) {
            this.graficarInstrucciones(_instruccion.instrucciones, idCd)
        }

    }
    graficarifelse(_instruccion, _padre) {
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"if\"]; \n";
        this.grafo += _padre + "->" + idC + ";"

        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"CONDICION\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_instruccion.expresion, idC)
        var idCd = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idCd + "[label= \"INSTRUCCIONES_IF\"]; \n";
        this.grafo += _padre + "->" + idCd + ";"
        if (_instruccion.instruccionesIf != null) {
            this.graficarInstrucciones(_instruccion.instruccionesIf, idCd)
        }
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"else\"]; \n";
        this.grafo += _padre + "->" + idC + ";"

        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"INSTRUCCIONES_ELSE\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        if (_instruccion.instruccionesElse != null) {
            this.graficarInstrucciones(_instruccion.instruccionesElse, idC)
        }
    }
    graficarifelseif(_instruccion, _padre) {
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"if\"]; \n";
        this.grafo += _padre + "->" + idC + ";"

        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"CONDICION\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_instruccion.expresion, idC)
        var idCd = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idCd + "[label= \"INSTRUCCIONES_IF\"]; \n";
        this.grafo += _padre + "->" + idCd + ";"
        if (_instruccion.instruccionesIf != null) {
            this.graficarInstrucciones(_instruccion.instruccionesIf, idCd)
        }
        if (_instruccion.lista_elseif != null) {
            for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
                var idC = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idC + "[label= \"else if\"]; \n";
                this.grafo += _padre + "->" + idC + ";"

                var idC = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idC + "[label= \"CONDICION_ELSE_IF\"]; \n";
                this.grafo += _padre + "->" + idC + ";"
                this.graficarOperacion(_instruccion.lista_elseif[i].expresion, idC)
                var idCd = "Nodo" + this.cont;
                this.cont++;
                this.grafo += idCd + "[label= \"INSTRUCCIONES_IF_ELSE\"]; \n";
                this.grafo += _padre + "->" + idCd + ";"
                this.graficarInstrucciones(_instruccion.lista_elseif[i].instruccionesElseIf, idCd)
            }
        }
        if (_instruccion.instruccionesElse != null) {
            var asd = "Nodo" + this.cont;
            this.cont++;
            this.grafo += asd + "[label= \"else\"]; \n";
            this.grafo += _padre + "->" + asd + ";"
            var idC = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idC + "[label= \"INSTRUCCIONES_ELSE\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
            if (_instruccion.instruccionesElse != null) {
                this.graficarInstrucciones(_instruccion.instruccionesElse, idC)
            }
        }
    }

    graficarDoWhile(_instruccion, _padre) {
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"DO\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        if (_instruccion.instrucciones != null) {
            var idCd = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idCd + "[label= \"INSTRUCCIONES_DOWHILE\"]; \n";
            this.grafo += _padre + "->" + idCd + ";"
            if (_instruccion.instrucciones != null) {
                this.graficarInstrucciones(_instruccion.instrucciones, idCd)
            }
        }
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"WHILE\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"CONDICION\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_instruccion.expresion, idC)
    }
    graficarPrint(_expresion, _padre) {
        if (_expresion.tipo === TIPO_INSTRUCCION.PRINT) {
            var idC = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idC + "[label= \"print\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
        } else if (_expresion.tipo === TIPO_INSTRUCCION.PRINTLN) {
            var idC = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idC + "[label= \"println\"]; \n";
            this.grafo += _padre + "->" + idC + ";"
        }

        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \"(\"]; \n";
        this.grafo += _padre + "->" + idC + ";"

        var idNodo = "Nodo" + this.cont
        this.cont++;
        this.grafo += idNodo + "[label= \"EXPRESION\"]; \n";
        this.grafo += _padre + "->" + idNodo + ";"
        var idC = "Nodo" + this.cont;
        this.cont++;
        this.grafo += idC + "[label= \")\"]; \n";
        this.grafo += _padre + "->" + idC + ";"
        this.graficarOperacion(_expresion.expresion, idNodo);

    }
    graficarOperacion(_expresion, _padre) {
        if (_expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.BOOLEANO || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
            var exp = _expresion.valor.toString();
            exp = exp.replace(/\"/gi, '\\\"');
            var value = "Nodo" + this.cont;
            this.grafo += value + "[label= \" " + exp + "\" ]; \n";
            this.grafo += _padre + "->" + value + "; \n";
            this.cont++;
        } else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION || _expresion.tipo === TIPO_OPERACION.MODULO || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL || _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.OR) {
            var value = "Nodo" + this.cont;
            this.grafo += value + "[ label = \" " + this.getSimbolo(_expresion.tipo) + "\" ]; \n ";
            this.grafo += _padre + "->" + value + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.opIzq, value);
            this.graficarOperacion(_expresion.opDer, value);
        } else if (_expresion.tipo === TIPO_OPERACION.NEGACION) {
            var value = "Nodo" + this.cont;
            this.grafo += value + "[ label = \" " + "-" + "\" ]; \n ";
            this.grafo += _padre + "->" + value + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.opDer, value);
        } else if (_expresion.tipo === TIPO_OPERACION.ROUND || _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.LENGTH || _expresion.tipo === TIPO_OPERACION.TOUPPER || _expresion.tipo === TIPO_OPERACION.TOLOWER || _expresion.tipo === TIPO_OPERACION.TOSTRING || _expresion.tipo === TIPO_OPERACION.TYPEOF) {
            var value = "Nodo" + this.cont;
            this.grafo += value + "[ label = \" " + _expresion.tipo + "\" ]; \n ";
            this.grafo += _padre + "->" + value + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.opIzq, value);
        } else if (_expresion.tipo === TIPO_OPERACION.VALOR_VECTOR) {
            var value = "Nodo" + this.cont;
            this.grafo += value + "[ label = \" " + _expresion.tipo + "\" ]; \n ";
            this.grafo += _padre + "->" + value + ";\n";
            this.cont++;
            var v = "Nodo" + this.cont;
            this.grafo += v + "[ label = \" " + _expresion.opIzq + "\" ]; \n ";
            this.grafo += value + "->" + v + ";\n";
            this.cont++;
            var ex = "Nodo" + this.cont;
            this.grafo += ex + "[ label = \" " + "[ EXPRESION ]" + "\" ]; \n ";
            this.grafo += value + "->" + ex + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.opDer, ex);
        } else if (_expresion.tipo === TIPO_OPERACION.VALOR_VECTOR2D) {
            var value = "Nodo" + this.cont;
            this.grafo += value + "[ label = \" " + _expresion.tipo + "\" ]; \n ";
            this.grafo += _padre + "->" + value + ";\n";
            this.cont++;
            var v = "Nodo" + this.cont;
            this.grafo += v + "[ label = \" " + _expresion.opIzq + "\" ]; \n ";
            this.grafo += value + "->" + v + ";\n";
            this.cont++;
            var ex = "Nodo" + this.cont;
            this.grafo += ex + "[ label = \" " + "[ EXPRESION ]" + "\" ]; \n ";
            this.grafo += value + "->" + ex + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.opDer, ex);
            var ex = "Nodo" + this.cont;
            this.grafo += ex + "[ label = \" " + "[ EXPRESION ]" + "\" ]; \n ";
            this.grafo += value + "->" + ex + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.exp, ex);
        } else if (_expresion.tipo === TIPO_OPERACION.CAST) {
            var value = "Nodo" + this.cont;
            this.grafo += value + "[ label = \" " + "CASTEO" + "\" ]; \n ";
            this.grafo += _padre + "->" + value + ";\n";
            this.cont++;
            var v = "Nodo" + this.cont;
            this.grafo += v + "[ label = \" " + "TIPO_DATO" + "\" ]; \n ";
            this.grafo += value + "->" + v + ";\n";
            this.cont++;
            var vs = "Nodo" + this.cont;
            this.grafo += vs + "[ label = \" " + _expresion.opDer + "\" ]; \n ";
            this.grafo += v + "->" + vs + ";\n";
            this.cont++;
            this.graficarOperacion(_expresion.opIzq, value)
        } else if (_expresion.tipo === "LLAMADA") {
            var idHijo = "Nodo" + this.cont;
            this.cont++;
            this.grafo += idHijo + "[label= \"LLAMADA\"]; \n";
            this.grafo += _padre + "->" + idHijo + ";"
            this.graficarLlamada(_expresion, idHijo)
        }
    }
    getSimbolo(_tipo) {
        switch (_tipo) {
            case TIPO_OPERACION.SUMA:
                return '+'
            case TIPO_OPERACION.RESTA:
                return '-'
            case TIPO_OPERACION.MULTIPLICACION:
                return '*'
            case TIPO_OPERACION.DIVISION:
                return '/'
            case TIPO_OPERACION.MODULO:
                return '%'
            case TIPO_OPERACION.POTENCIA:
                return '^'
            case TIPO_OPERACION.IGUALIGUAL:
                return '=='
            case TIPO_OPERACION.DIFERENTE:
                return '!='
            case TIPO_OPERACION.MENOR:
                return '<'
            case TIPO_OPERACION.MAYOR:
                return '>'
            case TIPO_OPERACION.MAYORIGUAL:
                return '>='
            case TIPO_OPERACION.MENORIGUAL:
                return '<='
            case TIPO_OPERACION.AND:
                return '&&'
            case TIPO_OPERACION.OR:
                return '||'

        }
    }

}


module.exports = GenerarDot;

