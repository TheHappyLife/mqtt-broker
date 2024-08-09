import { Client } from "aedes";
import publishToSpecificClient from "./sendMessageToClient";

export default function onClientConnected(client: Client) {
  publishToSpecificClient(
    client,
    "test/topic",
    JSON.stringify({ message: "hello guy <3" })
  );
}
