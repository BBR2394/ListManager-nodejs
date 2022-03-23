
/**
 * créé le 18  Mars 2022
 */

const port = 5009
//package used in order to parse the body from a POST request
// otherwise, exppress doesnt read the body ...
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
var fs = require('file-system');

//to set body arser to read json in the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ressources/list.json');
})

function myWrite(fileName , txt) {
    fs.writeFile(fileName, txt, (err) => {
        if(err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });
}

app.post('/', (req, res) => {
    myWrite("ressources/outUn.txt", "bonjour je suis \necrit deuis mon programme")
    res.send("en cours : pour sauvegarder la liste")
})

app.put('/', (req, res) => {
    res.send("en cours")
})

app.listen(port, () => {
    console.log("app started")
    console.log(`port ${port}`)
    console.log(`localhost:${port}`)
    console.log('test')
})