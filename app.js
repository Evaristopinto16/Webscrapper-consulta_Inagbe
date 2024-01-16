const express = require("express")
const bodyParser = require("body-parser")
const apiBi = require("./api")

const app = express()

app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
  

app.get("/", (req, res)=>{
    res.render("index")
})
app.post("/consulta", async (req, res)=>{
    
    let dados = await apiBi(req.body.bi)
    console.log(dados)
    res.render('consulta', {dados})
})


app.listen(3000, ()=>{
    console.log('servodor no ar!!!')
})