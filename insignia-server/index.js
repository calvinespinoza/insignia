const { PlayFabServer, PlayFab, PlayFabClient } = require("playfab-sdk");

function getLeaderboard(statisticName, fn) {
    PlayFab.settings.developerSecretKey = "6QG3HXGR4X393YGBIWBPAHYBXA5SD4RXTSJAOX6BJPXW4BKOMO";
    var leaderboardRequest = {
        StatisticName: statisticName,
        StartPosition: 0,
        MaxResultsCount: 20
    }
    console.log("Getting " + statisticName);
    PlayFabServer.GetLeaderboard(leaderboardRequest, function (error, result) {
        console.log(JSON.stringify(result.data.Leaderboard));
        console.log(CompileErrorReport(error));
        fn(error, result);
    })
}

function login(request, fn) {
    request = JSON.parse(request);
    PlayFab.settings.titleId = "A32F0";

    var loginRequest = {
        Username: request.username,
        Password: request.password
    }
    console.log({LoginRequest: loginRequest});
    PlayFabClient.LoginWithPlayFab(loginRequest, function (error, result) {
        console.log(JSON.stringify(result));
        console.log(CompileErrorReport(error));
        fn(error, result);
    })
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

module.exports = { getLeaderboard, login }