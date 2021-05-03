
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var client = new kafka.KafkaClient({kafkaHost: 'broker:9092'});

var offset = new kafka.Offset(client);
  offset.fetch([{ topic: 'spam_data', partition: 0, time: -1 }], function (err, data) {
  var latestOffset = data['spam_data']['0'][0];
  console.log("Consumer current offset: " + latestOffset);

  var consumer_data = new Consumer(
    client, [ { topic: 'spam_data', offset: latestOffset, partition: 0 } ], {groupId: 'group2', autoCommit: false, fromOffset: 'latest'});

  var app = require('express')();
  var http = require('http').Server(app);
  //creates a new socket.io instance attached to the http server.
  var io = require('socket.io')(http);

  http.listen(3000, function() {
    console.log('listening on *:3000');
  });

  consumer_data.on('offsetOutOfRange', (message) => {
    console.log('offsetOutOfRange_data');
  });

  consumer_data.on('message', (message_data) => {
    data_data = JSON.parse(message_data.value);
    //console.log(data_data);
    io.emit('update_data', data_data);
  });

  io.on('connect', function (socket) {
    console.log('a user connected');
  });
});
