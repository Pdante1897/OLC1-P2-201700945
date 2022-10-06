'use strict'
const express = require('express')
const bodParser = require('body-parser')
let cors = require('cors')

const app = express()
//const parser = require('./analizador')

app.use(bodParser.json({limit:'50mb', extended:true}))
app.use(bodParser.urlencoded({limit:'50mb', extended:true}))
app.use(cors())

app.get('/',(req,res)=>{
    var respuesta={
        message:"Todo bien"
    }
    res.send(respuesta)
})
app.listen('4000', ()=>{
    console.log("Servidor en puerto 4000")
})