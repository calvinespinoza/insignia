let express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var cors = require('cors');
var path = require('path');

var playfab = require('./index');
var port = 8081;

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cors());

app.route("/leaderboard")
    .get(function (req, res, next) {
        console.log(req.query);
        const statisticName = req.query.statistic ? req.query.statistic : "High Score";
        playfab.getLeaderboard(statisticName, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result.data);
            }
        })
    });

app.route("/login")
    .post(playfab.login);

app.route("/current-user/:entityId")
    .get(playfab.getCurrentUser);

if (process.env.NODE_ENV === 'production') {
    //production mode
    app.use(express.static(path.join(__dirname, '/insignia-client/build')));
    app.get('*', (req, res) => {
        res.sendFile('insignia-client/build/index.html', { root: __dirname });
    })
} else {
    //build mode
    app.get('*', (req, res) => { res.sendFile('insignia-client/public/index.html', { root: __dirname }); })
}

app.listen(process.env.PORT || port, function () {
    console.log("Server running on port " + port)
});

//module.exports = { app, server }; // for testing