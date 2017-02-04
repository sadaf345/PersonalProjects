function getMatchHistoryObj() {
    var SUMMONER_ID = $("#userName").val();
    var API_KEY = "RGAPI-7C903B7F-309B-4155-ACA8-8E0A73240DA3";
    
    $.ajax({
         url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + SUMMONER_ID + '/recent?api_key=' + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function() {},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
       
       });
    
    return json
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
    for (var i = 0; i < 10; i++) {
        gameStatus = json['games'][i]['stats'].win;
        if (gameStatus) {
            winRate++;
        }
    }
    finalWinRate = (winRate / 10) * 100;    
    return finalWinRate;
}

function getAvgKDA(json) {
    totalKills = totalDeaths = totalAssists = singleKDA =  averageKDA = 0;
    for (var i = 0; i < 10; i++) {
        totalKills = json['games'][i]['stats'].championsKilled;
        totalDeaths = json['games'][i]['stats'].numDeaths;
        totalAssists = json['games'][i]['stats'].assists;
        singleKDA = (totalKills + totalAssists) / totalDeaths;
        console.log(singleKDA);
        averageKDA += singleKDA
    }
    averageKDA = averageKDA / 10; // 5 games
    
    return Math.round(averageKDA * 100) / 100;
}


            