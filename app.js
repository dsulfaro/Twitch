var usernames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","OgamingSC2","ESL_SC2","cretetion","TR7K", "charmed_zer0"];

var colors = ["#FFFFFF", "#00171F", "#003459", "#007EA7", "#00A8E8"];

$(document).ready(function(){
  var j = 0;
  var online = [];
  var offline = [];
  for (var i = 0; i < usernames.length; ++i){
    $.getJSON('https://api.twitch.tv/kraken/streams/'+usernames[i]+'?callback=?', function(data) {
      if (data.stream === null){
        offline.push(usernames[j]);
      }
      else{
        var d = data;
        online.push(data);
      }
      if (j === usernames.length - 1){
        displayOnline(online);
        displayOffline(offline);
      }
      ++j;
    });
  }
});

function displayOnline(arr){
  for (var k = 0; k < arr.length; ++k){
    var logo = JSON.stringify(arr[k].stream.channel.logo);
    var name = JSON.stringify(arr[k].stream.channel.display_name);
    name = name.replace(/['"]+/g, '');
    var game = JSON.stringify(arr[k].stream.channel.game);
    game=game.replace(/['"]+/g, '');
    var channel = JSON.stringify(arr[k].stream.channel._links.self);
    $('#cont').append("<div class='stream'>" +
                        "<div class='row'>" +
                          "<div class='col-md-1'>" +
                            "<img src="+logo+" class='photo' />"+
                          "</div>" +
                          "<div class='col-md-3 col-md-offset-1'>"+
                            "<h2 class='name'><a href='https://www.twitch.tv/"+name+"' target='_blank'>"+name.replace(/['"]+/g, '')+"</a></h2>"+
                          "</div>"+
                          //"<div class='col-md-5 col-md-offset-5'>"+
                            "<h3 class='game'>"+ game +"</h3>"+
                          //"</div>"+
                        "</div>" +
                      "</div>");
  }
}

function displayOffline(arr){
  for (var k = 0; k < arr.length; ++k){
    var name = arr[k];
    $('#cont').append("<div class='offline'>"+
                        "<div class='row'>"+
                          "<div class='col-md-1 col-md-offset-1'>"+
                          "<h1 class='q'>?</h1>"+
                          "</div>"+
                      "<div class='col-md-3 col-md-offset-1'>"+
                            "<h2 class='name'><a href='https://www.twitch.tv/"+name+"' target='_blank'>"+name.replace(/['"]+/g, '')+"</a></h2>"+
                          "</div>"+
                      "<h3 class='game'>OFFLINE</h3>"+
                        "</div>"+
                      "</div>");
  }
}