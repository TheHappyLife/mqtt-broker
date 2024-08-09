import { Client, PublishPacket, Subscription } from "aedes";
import * as net from "net";
import * as ws from "websocket-stream";
import * as http from "http";
import onClientConnected from "./handlers/onClientConnected";
import onGetMessageFromClient from "./handlers/onGetMessageFromClient";
const aedes = require("aedes");

const port = 1883;
const wsPort = 8883;

const aedesInstance = aedes();

const server = net.createServer(aedesInstance.handle);

server.listen(port, function () {
  console.log(`MQTT broker started and listening on port ${port}`);
});

const subscribedClients: any[] = [];

// WebSocket server
const httpServer = http.createServer();
ws.createServer({ server: httpServer }, aedesInstance.handle as any);
httpServer.listen(wsPort, function () {
  console.log(`WebSocket server started and listening on port ${wsPort}`);
});

aedesInstance.on("client", onClientConnected);

aedesInstance.on("clientDisconnect", function (client: Client) {
  console.log(`Client Disconnected: ${client ? client.id : "unknown"}`);
});

aedesInstance.on("publish", (packet: PublishPacket, client: Client) =>
  onGetMessageFromClient(packet, client, (data: any) => {
    subscribedClients.push(data);
    console.log(
      "🚀 ~ onGetMessageFromClient ~ subscribedClients:",
      subscribedClients
    );
  })
);

aedesInstance.on(
  "subscribe",
  function (subscriptions: Subscription[], client: Client) {
    console.log(
      `Client ${
        client ? client.id : "unknown"
      } subscribed to topics: ${subscriptions.map((s) => s.topic).join(", ")}`
    );
  }
);

aedesInstance.on(
  "unsubscribe",
  function (subscriptions: string[], client: Client) {
    console.log(
      `Client ${
        client ? client.id : "unknown"
      } unsubscribed from topics: ${subscriptions.join(", ")}`
    );
  }
);
