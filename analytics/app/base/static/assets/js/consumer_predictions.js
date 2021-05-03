
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var client = new kafka.KafkaClient({kafkaHost: 'broker:9092'});

var offset = new kafka.Offset(client);
  offset.fetch([{ topic: 'spam_predictions', partition: 0, time: -1 }], function (err, data) {
  var latestOffset = data['spam_predictions']['0'][0];
  console.log("Consumer current offset: " + latestOffset);
  
  var consumer_predictions = new Consumer(
    client, [ { topic: 'spam_predictions', offset: latestOffset,  partition: 0 } ], {groupId: 'group1', autoCommit: false, fromOffset: 'latest'});

  var app = require('express')();
  var http = require('http').Server(app);
  //creates a new socket.io instance attached to the http server.
  var io = require('socket.io')(http);

  http.listen(3001, function(){
    console.log('listening on *:3000');
  });

  consumer_predictions.on('offsetOutOfRange', (message) => {
    console.log('offsetOutOfRange_predictions');
  });

  consumer_predictions.on('message', (message) => {
    data = JSON.parse(JSON.parse(message.value));
    //console.log(data);
    io.emit('update_predictions', data);
  });

  io.on('connect', function (socket) {
    console.log('a user connected');
  });
});
