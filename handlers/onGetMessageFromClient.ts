import { Client, PublishPacket } from "aedes";

export default function onGetMessageFromClient(
  packet: PublishPacket,
  client: Client,
  callBack: (data?: any) => any
) {
  if (client) {
    console.log(`Message from ${client.id}: ${packet.payload.toString()}`);
    callBack && callBack(packet.payload.toString());
  }
}
