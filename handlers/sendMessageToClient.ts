import { Client, PublishPacket } from "aedes";

export default function publishToSpecificClient(
  client: Client,
  topic: string,
  message: any
) {
  if (client) {
    const packet: PublishPacket = {
      cmd: "publish",
      qos: 0,
      retain: false,
      topic: topic,
      payload: message,
      dup: false,
      length: 0,
      messageId: 0,
    };
    client.publish(packet, (err) => {
      if (err) {
        console.error(`Failed to send message to ${client.id}: ${err.message}`);
      } else {
        console.log(`Message sent to ${client.id}: ${message}`);
      }
    });
  } else {
    console.error(`Client not found`);
  }
}
