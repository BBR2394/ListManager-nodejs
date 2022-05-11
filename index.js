
/**
 * créé le 18  Mars 2022
 */

// package for the db
var postgresql = require('pg').Pool;

const port = 5009
//package used in order to parse the body from a POST request
// otherwise, exppress doesnt read the body ...
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
var fs = require('file-system');

var cors = require('cors')

/**
 * postgresql configuration
 */
const poolpgsql = new postgresql({
  user: 'Baptiste',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
})

let globalvar = 42
// pour cette putain d'autorisation cors
app.use(cors());
//to set body arser to read json in the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    console.log("on a eu un GET")
    let dataJson = ""
    const data = fs.readFileSync(__dirname + '/ressources/list.json', 'utf8')
    console.log(data)
    let box = JSON.parse(data);
    console.log(box[0])
    // fs.readFile(__dirname + '/ressources/list.json', 'json' , (err, data) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     dataJson = data;
    //     console.log(data)
    //     res.send(dataJson);
    //   });
    res.json(box)
    //res.json(__dirname + '/ressources/list.json');
    //res.sendFile(__dirname + '/ressources/list.json');
})

app.get('/debug', (req, res) => {
    console.log("on a eu un GET debug")
    res.send([{"name":"toto", "desc": "dfdsghj"},{"name":"titi", "desc":"yuiejn"}])
})

function myWrite(fileName , txt) {
    globalvar += 1;
    fs.writeFile(fileName, txt, (err) => {
        if(err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });
    console.log(globalvar)
}

app.post('/', (req, res) => {
    myWrite("ressources/outDeux.txt", "bonjour je suis \necrit deuis mon programme")
    res.send("en cours : pour sauvegarder la liste")
})
 
app.post('/', (req, res) => {
    res.send("en cours POST")
    
    console.log(req)
    res.status(200)
})

app.put('/', (req, res) => {
    res.send("en cours put")

    console.log(req)
    res.status(200)
})

app.listen(port, () => {
    console.log("app started")
    console.log(`port ${port}`)
    console.log(`localhost:${port}`)
    console.log('test')
})