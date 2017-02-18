function getMatchHistoryObj() {
    var SUMMONER_ID = $("#userName").val();
    var API_KEY = "RGAPI-7C903B7F-309B-4155-ACA8-8E0A73240DA3";
        
    $.getJSON('https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + SUMMONER_ID + '/recent?api_key=' + API_KEY).then(function(data, err) {
            if (!err) {
                alert("error getting Summoner data!");
            }
            return data;
        })
    }

function getSingleMatchObj() {
    var SUMMONER_ID = $("#userName").val();
    var API_KEY = "RGAPI-7C903B7F-309B-4155-ACA8-8E0A73240DA3";
    $.getJSON('https://na.api.pvp.net/api/lol/na/v2.2/match/' + SUMMONER_ID + '?includeTimeline=true&api_key=' + API_KEY).then(function(data, err) {
            if (!err) {
                alert("error getting Summoner data!");
            }
            return data;
        })
    }
}

function summonerLookUp() {
    
    var SUMMONER_ID = $("#userName").val();
    var API_KEY = "RGAPI-7C903B7F-309B-4155-ACA8-8E0A73240DA3";
        
    
    $.ajax({
         url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + SUMMONER_ID + '/recent?api_key=' + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function(json) {
            winBoolean = json['games'][0]['stats'].win;
            document.getElementById("winRate").innerHTML = getWinRate(json) + "%";
            document.getElementById("averageKDA").innerHTML = getAvgKDA(json);
        },
        
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
       
       });
    
}
    
    
function getWinRate(json) {
    winRate = 0;
    finalWinRate = 0;
    for (var i = 0; i < 5; i++) {
        gameStatus = json['games'][i]['stats'].win;
        if (gameStatus) {
            winRate++;
        }
    }
    finalWinRate = (winRate / 5) * 100;    
    return finalWinRate;
}

function getAvgKDA(json) {
    totalKills = totalDeaths = totalAssists = singleKDA =  averageKDA = 0;
    for (var i = 0; i < 5; i++) {
        totalKills = json['games'][i]['stats'].championsKilled;
        totalDeaths = json['games'][i]['stats'].numDeaths;
        totalAssists = json['games'][i]['stats'].assists;
        singleKDA = (totalKills + totalAssists) / totalDeaths;
        averageKDA += singleKDA
    }
    averageKDA = averageKDA / 5; // 5 games
    
    return Math.round(averageKDA * 100) / 100;
}

function getAvgWardingStat(json) {
    var wardingPGAvg = 0;
    for (var i = 0; i < 5; i++) {
        wardingPGAvg += json['games'][i]['stats'].wardPlaced;
    }
    wardingPGAvg = wardingPGAvg / 5;
    return Math.round(wardingPGAvg * 100) / 100;
}

function getAvgWardingStatInLaningPhase(json) {
    var matchID = 0;
    var wardPlacedPerGameAvg = 0;
    for (var i = 0; i < 5; i++) {
        matchID = json['games'][i].gameId;
        jsonObject = getSingleMatchObj();
        wardPlacedPerGameAvg += jsonObject['participants'][i]
        
    }
}


            