var PlayFab = require("./playfab/PlayFab.js");
var PlayFabClient = require("./playfab/PlayFabClient.js");

function loginWithPlayFab(req, res) {
    PlayFab.settings.titleId = "A32F0";
    var loginRequest = {
        // Currently, you need to look up the correct format for this object in the API-docs:
        // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
        TitleId: "A32F0",
        Username: "thisiscalvin",
        Password: "calvin"
    };

    PlayFabClient.LoginWithPlayFab(loginRequest, loginCallback, res);
}


function loginCallback(error, result, res) {
    if (result !== null) {
        console.log("Success");
        getLeaderboard("Total Score", res);
    } else if (error !== null) {
        console.log("Something went wrong with your API call.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
}

function functionCallback(error, result, res) {
    if (result !== null) {
        console.log("Success");
        console.log(JSON.stringify(result.data.Leaderboard));
        res.send(result.data.Leaderboard);
    } else if (error !== null) {
        console.log("Something went wrong with your API call.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
}

function getLeaderboard(leaderboardName, res) {
    var leaderboardRequest = {
        StatisticName: leaderboardName,
        StartPosition: 0
    }
    PlayFabClient.GetLeaderboard(leaderboardRequest, functionCallback, res);
}
// This is a utility function we haven't put into the core SDK yet.  Feel free to use it.
function CompileErrorReport(error) {
    if (error == null)
        return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}

module.exports = { getLeaderboard, loginWithPlayFab };