// Tehdään express app
var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var HTTP_PORT = 8000
// Käynnistetään serveri
app.listen(HTTP_PORT, () =>{
    console.log("=================================\nServer running on port %PORT%\n=================================".replace("%PORT%", HTTP_PORT))
}
)

app.get("/", (req, res, next) => {
    res.json({"message":"OK"})
})


app.get("/api/measurements/", (req, res, next) =>{
    var select = "SELECT * FROM mittaus;"
    
    db.all(select, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
})

app.post("/api/measurements/", (req, res, next) =>{
    var errors = []
    if (!req.body.numero){
        errors.push("Numeroa ei määritetty")
    }
    if (errors.length){
        res.status(400).json({"error": errors.join(",")})
    }

    var data = {
        numero: req.body.numero
    }

    var insert = "INSERT INTO mittaus(numero, aika) VALUES (?,DATETIME(CURRENT_TIMESTAMP,\'localtime\'));"
    var param = [data.numero]
    db.run(insert, param, function(err,result){
        if (err) {
            res.status(400).json({"Error":err.message})
            console.log("sql error: %ERR%".replace("%ERR%", err.message))
            return
        }
        res.json({
            "message" : "success",
            "data" : data,
            "id" : this.lastID
        })
    })

})

//oletusvastaus jos pyynnölle ei ole käsittelyä
/*app.use(function(req,res) {
    res.status(404);
})*/
