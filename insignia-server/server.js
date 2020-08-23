let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let queryString = require("querystring");

let playfab = require('./index');

var cors = require('cors');
let port = 8080;

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.use(cors());

app.route("/leaderboard")
    .get(function(req, res, next)
    {
        console.log(req.query);
        const statisticName = req.query.statistic ? req.query.statistic : "High Score";
        playfab.getLeaderboard(statisticName, function(err, result)
        {
            res.send(result.data);
        })
    });
    
app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing