let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cors = require('cors');
let port = 8080;
let playfab = require('./index');

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.use(cors());

app.route("/test")
    .get(playfab.loginWithPlayFab);
    
app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing