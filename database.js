var sqlite3 = require("sqlite3").verbose()

const DBSOURCE = "mittaukset.db3"

let db = new sqlite3.Database(DBSOURCE, (err) =>{
    if(err) {
        console.error(err.message)
        throw err
    } else {
        console.log("Connected to SQLite database")
        db.run("CREATE TABLE mittaus (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            numero TEXT, \
            aika TEXT);", (err) =>{
                if(err) {

                } else {
                    var insert = "INSERT INTO mittaus(numero, aika) VALUES (?, datetime(CURRENT_TIMESTAMP,\'localtime\'));"
                    db.run(insert, [20011])
                    db.run(insert, [20012])
                }
            })
    }
})

module.exports = db