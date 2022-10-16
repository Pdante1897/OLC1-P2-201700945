%lex
 %options case-insensitive
 %%
\s+                   {/**/}

"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas
//Palabras Reservadas
"int"                       {return 'int';}
"double"                    {return 'double';}
"boolean"                   {return 'boolean';}
"char"                      {return 'char';}
"string"                    {return 'string';}
"if"                        {return 'if';}
"else"                      {return 'else';}
"switch"                    {return 'switch';}
"case"                      {return 'case';}
"default"                   {return 'default';}
"print"                     {return 'print';}
"println"                   {return 'println';}
"while"                     {return 'while';}
"for"                       {return 'for';}
"do"                        {return 'do';}
"break"                     {return 'break';}
"continue"                  {return 'continue';}
"return"                    {return 'return';}
"void"                      {return 'void';}
"true"                      {return 'true';}
"false"                     {return 'false';}
"new"                       {return 'new';}
"tolower"                   {return 'tolower';}
"toupper"                   {return 'toupper';}
"length"                    {return 'length';}
"truncate"                  {return 'truncate';}
"round"                     {return 'round';}
"typeof"                    {return 'typeof';}
"tostring"                  {return 'tostring';}
"tochararray"               {return 'tochararray';}
"run"                      {return 'run';}
//Incrementadores
"++"                        {return 'aumento';}
"--"                        {return 'decremento';}
//Operadores Relacionales
"=="                        {return 'igualacion';}
"<="                        {return 'menorigual';}
">="                        {return 'mayorigual';}
"!="                        {return 'diferente';}
"<"                         {return 'menor';}
">"                         {return 'mayor';}
//Operadores Aritmeticos
"+"                         {return 'suma';}
"-"                         {return 'menos';}
"*"                         {return 'mult';}
"/"                         {return 'division';}
"^"                         {return 'potencia';}
"%"                         {return 'modulo';}
"="                         {return 'igual'}
//Operadores Logicos 
"||"                        {return 'or';}
"&&"                        {return 'and';}
"!"                         {return 'not';}
//Especiales
"\\n"                       {return 'salto';}
"\\\\"                      {return 'barrainv';}
"\\\""                      {return 'comilladoble';}
"\\t"                        {return 'tabulacion';}
"\\'"                       {return 'comillasimple'}
//Caracteres
","                         {return 'coma';}
";"                         {return 'ptcoma';}
":"                         {return 'dpuntos';}
"?"                         {return 'interrogacionc';}
"{"                         {return 'llavea';}
"}"                         {return 'llavec';}
"("                         {return 'parentesisa';}
")"                         {return 'parentisisc';}
"["                         {return 'corchetea';}
"]"                         {return 'corchetec';}
"."                         {return 'punto';}
["\""]([^"\""])*["\""]      {return 'cadena'; }
["\'"]([^"\'"])?["\'"]      {return 'caracter'; }
[0-9]+("."[0-9]+)\b         {return 'decimal';}
[0-9]+\b                    {return 'entero';}
([a-zA-Z])[a-zA-Z0-9_]*     {return 'identificador';}
<<EOF>>                     {return 'EOF';}
.                           {
                                var reporte = new Reporte();
                                var addError = {
                                tipo: "Error Lexico",
                                descripcion: "El caracter "+yytext+" no pertenece al lenguaje",
                                fila: yylloc.first_line,
                                columna: yylloc.first_column
                                }
                                reporte.AgregarError(addError);
                            } 
/lex
%{
        const TIPO_DATO = require('./controller/Enums/TipoDato');
        const INSTRUCCION = require('./controller/Instruccion/Instruccion');
        const TIPO_OPERACION = require('./controller/Enums/TipoOperacion');
        const TIPO_VALOR = require('./controller/Enums/TipoValor');
        const Reporte = require('./controller/Reporte/Reporte')
%}
%left 'or'
%left 'and' 'interrogacionc'
%right 'not'
%left 'igualacion' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos'
%right 'aumento' 'decremento'
%left 'mult' 'division' 'modulo'
%left 'potencia' 
%right 'tolower' 'toupper' 'length' 'typeof'
%left UMINUS
%start INICIO
%% /* language grammar */


INICIO: PRINCIPAL EOF {return $1;}        
;

PRINCIPAL: PRINCIPAL CUERPO {$1.push($2); $$ = $1;}
          |CUERPO {$$=[$1];}                
;

CUERPO: DECLARACION {$$=$1}
           | ASIGNACION {$$=$1}
           | FUNCION {$$=$1}
           | METODOS {$$=$1}
           | EJECUTAR {$$=$1}
           | error {var reporte = new Reporte();
                    var addError = {
                        tipo: "Error Sintactico",
                        descripcion: "Encontrado "+yytext+" se esperaba punto y coma",
                        fila: this._$.first_line,
                        columna: this._$.first_column+1
                   }
                   reporte.AgregarError(addError);}                    
;

OPCIONESCUERPO: OPCIONESCUERPO OPCION {$1.push($2); $$ = $1;}
               |OPCION {$$=[$1];}
;

OPCION: LLAMADAS ptcoma {$$=$1}  
           | DECLARACION {$$=$1}
           | ASIGNACION {$$=$1}
           | IF {$$=$1}
           | WHILE {$$=$1}
           | DOWHILE {$$=$1}
           | SWITCH {$$=$1}
           | FOR {$$=$1}
           | FUNCION {$$=$1}
           | TRANSFERENCIA {$$=$1}
           | METODOS {$$=$1}
           | PRINT {$$=$1}
           | PRINTLN {$$=$1}
           | error {var reporte = new Reporte();
                    var addError = {
                        tipo: "Error Sintactico",
                        descripcion: "Encontrado "+yytext+" se esperaba punto y coma",
                        fila:this._$.first_line,
                        columna: this._$.first_column+1
                   }
                   reporte.AgregarError(addError);}     
;

DECLARACION: TIPO LISTAID igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2,$4,$1,this._$.first_line,this._$.first_column+1)}
            | TIPO LISTAID ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2,null,$1,this._$.first_line,this._$.first_column+1)}
            //Vectores 1 dimension
            | TIPO identificador corchetea corchetec igual new TIPO corchetea EXPRESION corchetec ptcoma{$$ = INSTRUCCION.nuevaDeclaracionVector($2,$9,$1,$7,this._$.first_line,this._$.first_column+1)}
            | TIPO identificador corchetea corchetec igual corchetea LISTAVALORES corchetec ptcoma{$$ = INSTRUCCION.nuevaDeclaracionVector($2,$7,$1,null,this._$.first_line,this._$.first_column+1)}
            | TIPO identificador corchetea corchetec igual tochararray parentesisa EXPRESION parentisisc ptcoma{$$ = INSTRUCCION.nuevaDeclaracionVectorChar($2,$8,$1,this._$.first_line,this._$.first_column+1)}    
            //Vectores 2 dimensiones
            | TIPO identificador corchetea corchetec corchetea corchetec igual new TIPO corchetea EXPRESION corchetec corchetea EXPRESION corchetec ptcoma{$$ = INSTRUCCION.nuevaDeclaracionVector2Dimensiones($2,$11,$14,$1,$9,this._$.first_line,this._$.first_column+1)}
            //Vectores 2 dimensiones
            | TIPO identificador corchetea corchetec corchetea corchetec igual corchetea LISTA2DIMENSIONES corchetec ptcoma{$$ = INSTRUCCION.nuevaDeclaracionVector2Dimensiones($2,$9,null,$1,null,this._$.first_line,this._$.first_column+1)}
            
;

LISTAID: LISTAID coma identificador {$1.push($3); $$=$1}
        | identificador {$$= [$1]}   
;

LISTA2DIMENSIONES: LISTA2DIMENSIONES coma corchetea LISTAVALORES corchetec{$1.push($4); }
                | corchetea LISTAVALORES corchetec {$$=[$2]}

;

IF: if parentesisa EXPRESION parentisisc llavea OPCIONESCUERPO llavec {$$= new INSTRUCCION.nuevoIf($3,$6,this._$.first_line,this._$.first_column+1)}}
    | if parentesisa EXPRESION parentisisc llavea OPCIONESCUERPO llavec else llavea OPCIONESCUERPO llavec {$$= new INSTRUCCION.nuevoIfElse($3,$6,$10,this._$.first_line,this._$.first_column+1)}}
    | if parentesisa EXPRESION parentisisc llavea OPCIONESCUERPO llavec ELSEIF {$$= new INSTRUCCION.nuevoIfConElseIf($3, $6, $8, null, this._$.first_line,this._$.first_column+1)}
    | if parentesisa EXPRESION parentisisc llavea OPCIONESCUERPO llavec ELSEIF else llavea OPCIONESCUERPO llavec {$$= new INSTRUCCION.nuevoIfConElseIf($3, $6, $8, $11, this._$.first_line,this._$.first_column+1)}
;

ELSEIF: ELSEIF CONELSEIF {$1.push($2); $$=$1;}
        | CONELSEIF {$$=[$1]}
;

CONELSEIF: else if parentesisa EXPRESION parentisisc llavea OPCIONESCUERPO llavec {$$ = new INSTRUCCION.nuevoElseIf($4, $7 , this._$.first_line,this._$.first_column+1) }

;

EJECUTAR: run identificador parentesisa parentisisc ptcoma {$$ = INSTRUCCION.nuevoRun($2, null,this._$.first_line,this._$.first_column+1)}
        | run identificador parentesisa LISTAVALORES parentisisc ptcoma {$$ = INSTRUCCION.nuevoRun($2, $4,this._$.first_line,this._$.first_column+1)}
;

LLAMADAS: identificador parentesisa parentisisc {$$ = INSTRUCCION.nuevaLlamada($1,null,this._$.first_line,this._$.first_column+1)}
        | identificador parentesisa LISTAVALORES parentisisc {$$ = INSTRUCCION.nuevaLlamada($1,$3,this._$.first_line,this._$.first_column+1)} 
;

LISTAVALORES: LISTAVALORES coma EXPRESION {$1.push($3); $$=$1}
             | EXPRESION {$$= [$1]}
;

EXPRESION: EXPRESION suma EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION menos EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION mult EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION division EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION modulo EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION potencia EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION or EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION and EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION igualacion EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION menor EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION menorigual EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION mayor EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION mayorigual EXPRESION  {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION diferente EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,null, this._$.first_line,this._$.first_column+1)}
        | EXPRESION interrogacionc EXPRESION dpuntos EXPRESION 
        | not EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria(null,$2, TIPO_OPERACION.NOT,null, this._$.first_line,this._$.first_column+1)}
        | parentesisa EXPRESION parentisisc {$$=$2}          
        | menos EXPRESION %prec UMINUS {$$ = INSTRUCCION.nuevaOperacionBinaria(null,$2, TIPO_OPERACION.NEGACION,null, this._$.first_line,this._$.first_column+1)} 
        | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
        | identificador aumento {$$ = INSTRUCCION.nuevaOperacionBinaria($1,null, TIPO_OPERACION.INCREMENTO,null, this._$.first_line,this._$.first_column+1)}
        | identificador decremento {$$ = INSTRUCCION.nuevaOperacionBinaria($1,null, TIPO_OPERACION.DECREMENTO,null, this._$.first_line,this._$.first_column+1)}
        | identificador corchetea EXPRESION corchetec {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.VALOR_VECTOR,null, this._$.first_line,this._$.first_column+1)}
        | identificador corchetea EXPRESION corchetec corchetea EXPRESION corchetec {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.VALOR_VECTOR2D,$6, this._$.first_line,this._$.first_column+1)}
        | cadena {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
        | decimal {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
        | entero {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1)}
        | caracter {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1)}
        | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BOOLEANO, this._$.first_line,this._$.first_column+1)}
        | false {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BOOLEANO, this._$.first_line,this._$.first_column+1)}
        | tolower parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.TOLOWER,null, this._$.first_line,this._$.first_column+1)}
        | toupper parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.TOUPPER,null, this._$.first_line,this._$.first_column+1)}
        | length parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.LENGTH,null, this._$.first_line,this._$.first_column+1)}
        | truncate parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.TRUNCATE,null, this._$.first_line,this._$.first_column+1)}
        | round parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.ROUND,null, this._$.first_line,this._$.first_column+1)}
        | typeof parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.TYPEOF,null, this._$.first_line,this._$.first_column+1)}
        | tostring parentesisa EXPRESION parentisisc {$$ = INSTRUCCION.nuevaOperacionBinaria($3,null, TIPO_OPERACION.TOSTRING,null, this._$.first_line,this._$.first_column+1)}
        | CASTEO {$$=$1}
        | LLAMADAS {$$=$1}
; 

CASTEO: parentesisa TIPO parentisisc VALORCAST {$$ = INSTRUCCION.nuevaOperacionBinaria($4,$2, TIPO_OPERACION.CAST,null, this._$.first_line,this._$.first_column+1)}
;

VALORCAST:  cadena {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
          | decimal {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
          | entero {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1)}
          | caracter {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1)}
          | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BOOLEANO, this._$.first_line,this._$.first_column+1)}
          | false {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BOOLEANO, this._$.first_line,this._$.first_column+1)}
          | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
;

SWITCH: switch parentesisa EXPRESION parentisisc llavea LISTACASE default dpuntos OPCIONESCUERPO llavec {$$ = new INSTRUCCION.nuevoSwitch($3,$6,$9,this._$.first_line,this._$.first_column+1)}
      | switch parentesisa EXPRESION parentisisc llavea LISTACASE llavec {$$ = new INSTRUCCION.nuevoSwitch($3,$6,null,this._$.first_line,this._$.first_column+1)}
      | switch parentesisa EXPRESION parentisisc llavea default dpuntos OPCIONESCUERPO llavec {$$ = new INSTRUCCION.nuevoSwitch($3,null,$8,this._$.first_line,this._$.first_column+1)}
;

LISTACASE: LISTACASE CASE {$1.push($2); $$=$1;}
          | CASE {$$=[$1]}
;

CASE: case EXPRESION dpuntos OPCIONESCUERPO {$$ = new INSTRUCCION.nuevoCase($2,$4,this._$.first_line,this._$.first_column+1)}
;

DOWHILE: do llavea OPCIONESCUERPO llavec while parentesisa EXPRESION parentisisc ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($7,$3,this._$.first_line,this._$.first_column+1)}
;

WHILE: while parentesisa EXPRESION parentisisc llavea OPCIONESCUERPO llavec {$$ = new INSTRUCCION.nuevoWhile($3,$6,this._$.first_line,this._$.first_column+1)}
;

FOR: for parentesisa DECLARACION EXPRESION ptcoma ACTUALIZACION parentisisc llavea OPCIONESCUERPO llavec {$$ = new INSTRUCCION.nuevoFor($3,$4,$6,$9,this._$.first_line,this._$.first_column+1)}
   | for parentesisa ASIGNACION EXPRESION ptcoma ACTUALIZACION parentisisc llavea OPCIONESCUERPO llavec {$$ = new INSTRUCCION.nuevoFor($3,$4,$6,$9,this._$.first_line,this._$.first_column+1)}
;

FUNCION: identificador parentesisa LISTAPARAMETROS parentisisc dpuntos TIPO llavea OPCIONESCUERPO llavec {$$ = INSTRUCCION.nuevoMetodo($1,$3,$8,"FUNCION",$6,this._$.first_line,this._$.first_column+1)}
        | identificador parentesisa parentisisc dpuntos TIPO llavea OPCIONESCUERPO llavec {$$ = INSTRUCCION.nuevoMetodo($1,null,$7,"FUNCION",$5,this._$.first_line,this._$.first_column+1)}
;

METODOS: identificador parentesisa parentisisc dpuntos void llavea OPCIONESCUERPO llavec {$$ = INSTRUCCION.nuevoMetodo($1,null,$7,"METODO","VOID",this._$.first_line,this._$.first_column+1)}
       | identificador parentesisa parentisisc llavea OPCIONESCUERPO llavec {$$ = INSTRUCCION.nuevoMetodo($1,null,$5,"METODO","VOID",this._$.first_line,this._$.first_column+1)}
       | identificador parentesisa LISTAPARAMETROS parentisisc dpuntos void llavea OPCIONESCUERPO llavec {$$ = INSTRUCCION.nuevoMetodo($1,$3,$8,"METODO","VOID",this._$.first_line,this._$.first_column+1)}
       | identificador parentesisa LISTAPARAMETROS parentisisc llavea OPCIONESCUERPO llavec  {$$ = INSTRUCCION.nuevoMetodo($1,$3,$6,"METODO","VOID",this._$.first_line,this._$.first_column+1)}
;

TRANSFERENCIA: break ptcoma {$$ = new INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1)}
             | continue ptcoma
             | return EXPRESION ptcoma {$$ = new INSTRUCCION.nuevoReturn($2,this._$.first_line,this._$.first_column+1)}
             | return ptcoma {$$ = new INSTRUCCION.nuevoReturn(null,this._$.first_line,this._$.first_column+1)}
             
;

LISTAPARAMETROS: LISTAPARAMETROS coma PARAMETROS {$1.push($3); $$ = $1;}
          | PARAMETROS {$$=[$1];}
;

PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2,null,$1,this._$.first_line,this._$.first_column+1)}
          | TIPO identificador corchetea corchetec {$$ = INSTRUCCION.nuevaDeclaracion($2,$1,"VECTOR",this._$.first_line,this._$.first_column+1)}
          | TIPO identificador corchetea corchetec corchetea corchetec {$$ = INSTRUCCION.nuevaDeclaracion($2,$1,"VECTOR_2D",this._$.first_line,this._$.first_column+1)}  
;

PRINT: print parentesisa EXPRESION parentisisc ptcoma {$$ = new INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1)}
;
PRINTLN: println parentesisa EXPRESION parentisisc ptcoma {$$ = new INSTRUCCION.nuevoPrintLn($3, this._$.first_line,this._$.first_column+1)}
;
 
ASIGNACION: identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3,null,null,this._$.first_line,this._$.first_column+1)}
            | identificador aumento ptcoma {$$ = INSTRUCCION.nuevoIncremento($1,TIPO_OPERACION.INCREMENTO,this._$.first_line,this._$.first_column+1)}
            | identificador decremento ptcoma {$$ = INSTRUCCION.nuevoIncremento($1,TIPO_OPERACION.DECREMENTO,this._$.first_line,this._$.first_column+1)}
            | identificador corchetea EXPRESION corchetec igual EXPRESION ptcoma{$$ = INSTRUCCION.nuevaAsignacion($1, $6,$3,null,this._$.first_line,this._$.first_column+1)}
            | identificador corchetea EXPRESION corchetec corchetea EXPRESION corchetec igual EXPRESION ptcoma  {$$ = INSTRUCCION.nuevaAsignacion($1, $9,$3,$6,this._$.first_line,this._$.first_column+1)}
;

ACTUALIZACION: identificador aumento {$$ = INSTRUCCION.nuevoIncremento($1,TIPO_OPERACION.INCREMENTO,this._$.first_line,this._$.first_column+1)}
             | identificador decremento {$$ = INSTRUCCION.nuevoIncremento($1,TIPO_OPERACION.DECREMENTO,this._$.first_line,this._$.first_column+1)}
             | identificador igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3,null,null,this._$.first_line,this._$.first_column+1)}  
;

TIPO: int {$$= TIPO_DATO.ENTERO}
    | double {$$= TIPO_DATO.DECIMAL}
    | boolean {$$= TIPO_DATO.BOOLEANO}
    | char {$$= TIPO_DATO.CARACTER}
    | string {$$= TIPO_DATO.CADENA}
;