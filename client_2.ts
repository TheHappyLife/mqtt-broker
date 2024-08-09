const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://192.168.1.4");

const deviceInfo = {
  name: "Device 2",
  id: "abchjk",
  type: "light",
};

client.on("connect", function () {
  console.log("Client connected to broker");
  client.subscribe("test/topic", function (err: any) {
    if (!err) {
      client.publish("test/topic", JSON.stringify(deviceInfo));
    }
  });
});

client.on("message", function (topic: any, message: any) {
  // message is Buffer
  console.log(message.toString());
  // client.end();
});
