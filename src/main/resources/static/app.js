var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}


window.onload = function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (room) {
            showRoom(JSON.parse(room.body));
        });
    });
}

// For now we don't need this
//function disconnect() {
//    if (stompClient != null) {
//        stompClient.disconnect();
//    }
//    setConnected(false);
//    console.log("Disconnected");
//}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'maxPlayers': $("#maxPlayers").val()}));
}

function showRoom(room) {
      $("#greetings").append("<tr><td>" + room.id + " " + room.maxPlayers + "</td></tr>");
}



// We don't need this for now :)
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});


// Ask tisho about the Rest thing cause you can't still deal with it.
//window.onload = function() {
//    $.ajax({
//        'utl': '/',
//        'type': 'GET',
//        'success' : function(data) {
//            alert("DATA REQUESTEd!")
//        }
//    })
//}