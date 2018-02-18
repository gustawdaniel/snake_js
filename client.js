// global object

const rtc = {
    addMessage: function(message, userId, self) {
        $(messageList).prepend($(`<li><span class='badge'>${self ? "you" : userId}</span><p>${message}</p></li>`));
    }
};

// Open a connection to Pusher
var pusher = new Pusher("9dd2b3faceb5836a18ad", { cluster: "eu" });

// Storage of Pusher connection socket ID
var socketId;

Pusher.log = m =>{ console.log(m); };

// Monitor Pusher connection state
pusher.connection.bind("state_change", function(states) {
    switch (states.current) {
        case "connected":
            socketId = pusher.connection.socket_id;
            break;
        case "disconnected":
        case "failed":
        case "unavailable":
            break;
    }
});


// Initialise DataChannel.js
var datachannel = new DataChannel();

// Set custom Pusher signalling channel
// https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md
datachannel.openSignalingChannel = function(config) {
    var channel = config.channel || this.channel || "default-channel";
    var xhrErrorCount = 0;

    var socket = {
        send: function(message) {
            $.ajax({
                type: "POST",
                url: "http://localhost:5001/message", // Node.js & Ruby (Sinatra)
                // url: "_servers/php/message.php", // PHP
                data: {
                    socketId: socketId,
                    channel: channel,
                    message: message
                },
                timeout: 1000,
                success: function(data) {
                    xhrErrorCount = 0;
                },
                error: function(xhr, type) {
                    // Increase XHR error count
                    xhrErrorCount++;

                    // Stop sending signaller messages if it's down
                    if (xhrErrorCount > 5) {
                        console.log("Disabling signaller due to connection failure");
                        datachannel.transmitRoomOnce = true;
                    }
                }
            });
        },
        channel: channel
    };

    // Subscribe to Pusher signalling channel
    var pusherChannel = pusher.subscribe(channel);

    // Call callback on successful connection to Pusher signalling channel
    pusherChannel.bind("pusher:subscription_succeeded", function() {
        if (config.callback) config.callback(socket);
    });

    // Proxy Pusher signaller messages to DataChannel
    pusherChannel.bind("message", function(message) {
        config.onmessage(message);
    });

    return socket;
};

var onCreateChannel = function() {
    var channelName = cleanChannelName(channelInput.value);

    if (!channelName) {
        console.log("No channel name given");
        return;
    }

    disableConnectInput();

    datachannel.open(channelName);
};

var onJoinChannel = function() {
    var channelName = cleanChannelName(channelInput.value);

    if (!channelName) {
        console.log("No channel name given");
        return;
    }

    disableConnectInput();

    // Search for existing data channels
    datachannel.connect(channelName);
};

var cleanChannelName = function(channel) {
    return channel.replace(/(\W)+/g, "-").toLowerCase();
};



var disableConnectInput = function() {
    channelInput.disabled = true;
    createChannelBtn.disabled = true;
    joinChannelBtn.disabled = true;
};

// Demo DOM elements
var channelInput = document.querySelector(".demo-chat-channel-input");
var createChannelBtn = document.querySelector(".demo-chat-create");
var joinChannelBtn = document.querySelector(".demo-chat-join");
var messageList = document.querySelector(".demo-chat-messages");
let messageForm = document.querySelector('form.message');

// Set up DOM listeners
createChannelBtn.addEventListener("click", onCreateChannel);
joinChannelBtn.addEventListener("click", onJoinChannel);

messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let message = e.target.message.value;

    if (!message) {
        console.log("No message given");
        return;
    }

    datachannel.send(message);
    rtc.addMessage(message, window.userid, true);

    e.target.reset();
});

// Set up DataChannel handlers
datachannel.onopen = function (userId) {
    document.querySelector(".demo-connect").classList.add("inactive");
    document.querySelector(".demo-chat").classList.remove("inactive");
};

datachannel.onmessage = function (message, userId) {
    rtc.addMessage(message, userId);
};