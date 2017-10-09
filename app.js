var express = require('express');
var app = express();

var server = app.listen(3000, listen);

// Call Back to tell that the server is listening
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://' + host + ':' + port);
}

// Serve anithing in the public directory
app.use(express.static('public'));

var fs = require('fs');

// What are all the files in the directory 'data'?
var files = fs.readdirSync('data');

// Require condordance
var Condordance = require('./concordance');

// Make an object with condordance
var wordcounts = new Condordance();

for (var i=0;i<files.length;i++) {
    var txt = fs.readFileSync('data/' + files[i], 'utf8');
    wordcounts.process(txt);
}
console.log('Finished all files.');
wordcounts.sortByCount();

// API route for sending all the concordance
app.get('/all', showAll);

function showAll(req, res) {
    res.send(wordcounts);
}

// Route to search the concordance about a single word
app.get('/search/:word', showOne);

function showOne(req, res) {
    var word = req.params['word'];

    // Object to send as a reply to the user
    var reply = {}
    var count = wordcounts.getCount(word);

    if(count === undefined){
        reply.status = "Word not fount!";
    } else {
        reply.status = "Success!";
        reply.count = count;
    }

    reply.word = word;
    res.send(reply);
}