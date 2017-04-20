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

$.ajax({url: "http://localhost:8080/rooms", success: function(result){
        alert(result);
}});

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

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'maxPlayers': $("#maxPlayers").val()}));
}

function showRoom(room) {
      $("#greetings").append("<tr><td>" + room.id + " " + room.maxPlayers + "</td></tr>");
}


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
