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
        stompClient.subscribe('/topic/greetings', function (greeting) {
//            console.log(JSON.parse(greeting.body)[0]);
            console.log("What is this ffs");
            rooms = JSON.parse(greeting.body);
            console.log("ROOMS LENGTH " + rooms.length)
            for(i = 0; i < rooms.length; i++) {
                showRoom(rooms[i])
            }
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
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showRoom(room) {
      $("#greetings").append("<tr><td>" + room.id + room.maxPlayers + "</td></tr>");
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