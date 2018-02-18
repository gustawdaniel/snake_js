// global object

const rtc = {
    addMessage: function(message, userId, self) {
        $(messageList).prepend($(`<li><span class='badge'>${self ? "you" : userId}</span><p>${message}</p></li>`));
    }
};

const html = {
    disableConnectInput: function() {
        channelInput.disabled = true;
        createChannelBtn.disabled = true;
        joinChannelBtn.disabled = true;
    }
};

// Open a connection to Pusher
let pusher = new Pusher("9dd2b3faceb5836a18ad", { cluster: "eu" });

// Storage of Pusher connection socket ID
let socketId;

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
let datachannel = new DataChannel();

// Set custom Pusher signalling channel
// https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md
datachannel.openSignalingChannel = function(config) {
    let channel = config.channel || this.channel || "default-channel";
    console.log("CHANNEL", channel);
    let xhrErrorCount = 0;

    let socket = {
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
                timeout: 1000
            }).done(data => {xhrErrorCount = 0;}).fail(xhr, type => {
                if (++xhrErrorCount > 5) {
                console.log("Disabling signaller due to connection failure");
                datachannel.transmitRoomOnce = true;
            }});
        },
        channel: channel
    };

    // Subscribe to Pusher signalling channel
    let pusherChannel = pusher.subscribe(channel);

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

let onCreateChannel = function() {
    let channelName = cleanChannelName(channelInput.value);

    if (!channelName) {
        console.log("No channel name given");
        return;
    }

    html.disableConnectInput();

    datachannel.open(channelName);
};

let onJoinChannel = function() {
    let channelName = cleanChannelName(channelInput.value);

    if (!channelName) {
        console.log("No channel name given");
        return;
    }

    html.disableConnectInput();

    // Search for existing data channels
    datachannel.connect(channelName);
};

let cleanChannelName = function(channel) {
    return channel.replace(/(\W)+/g, "-").toLowerCase();
};

// Demo DOM elements
let channelInput = document.querySelector(".demo-chat-channel-input");
let createChannelBtn = document.querySelector(".demo-chat-create");
let joinChannelBtn = document.querySelector(".demo-chat-join");
let messageList = document.querySelector(".demo-chat-messages");
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