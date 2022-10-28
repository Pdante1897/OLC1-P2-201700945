const Ambito = require("../controller/Ambito/Ambito")
const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")
const Reporte = require("../controller/Reporte/Reporte")
const GenerarDot = require("../controller/Reporte/GenerarDot")
module.exports=(parser,app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
         
       // try{            
            var ast = parser.parse(prueba)
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var cadena = Global(ast, AmbitoGlobal)
            var reportes = new Reporte();
            var tbsimbolos= [];
            for (let index = 0; index < reportes.tablaSimbolos.length; index++) {
                tbsimbolos.push(reportes.tablaSimbolos[index])                
            }
            var tberrores = [];
            for(let i = 0; i< reportes.tablaErrores.length; i++){
                var aggEr = {
                    id: i+1,
                    tipo: reportes.tablaErrores[i].tipo,
                    descripcion: reportes.tablaErrores[i].descripcion,
                    fila: reportes.tablaErrores[i].fila,
                    columna: reportes.tablaErrores[i].columna
                }
                tberrores.push(aggEr)
            }

            var graficar = new GenerarDot(ast);
            var dot = graficar.dot()
            var resultado ={
                arbol: ast,
                consola: cadena,
                tablaSimbolos: tbsimbolos,
                tablaErrores: tberrores,
                dotAst: dot 
            }
            reportes.tablaSimbolos.length = 0;
            reportes.tablaErrores.length = 0;
            res.send(resultado)
        //} catch(error){
           // res.send(error)
        //}
    })
}