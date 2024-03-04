import express from "express";
import { BASE_ONION_ROUTER_PORT } from "../config";

let lastReceivedEncryptedMessage : string | null = null;
let lastReceivedDecryptedMessage : string | null = null;
let lastMessageDestination : number | null = null;

export async function simpleOnionRouter(nodeId: number) {
  const onionRouter = express();
  onionRouter.use(express.json());

  onionRouter.get("/status", (req, res) => {
    res.send("live");
  });

  // Additional GET routes for message info
  onionRouter.get("/getLastReceivedEncryptedMessage", (req, res) => {
    res.json({ result: lastReceivedEncryptedMessage });
  });

  onionRouter.get("/getLastReceivedDecryptedMessage", (req, res) => {
    res.json({ result: lastReceivedDecryptedMessage });
  });

  onionRouter.get("/getLastMessageDestination", (req, res) => {
    res.json({ result: lastMessageDestination });
  });

  // Example message handling route (update as needed)
  onionRouter.post("/message", (req, res) => {
    // Logic for updating lastReceivedEncryptedMessage, lastReceivedDecryptedMessage, and lastMessageDestination
    // This is a simplified example. Update according to your encryption/decryption logic
    res.sendStatus(200);
  });

  const server = onionRouter.listen(BASE_ONION_ROUTER_PORT + nodeId, () => {
    console.log('Onion router ${nodeId} is listening on port ${BASE_ONION_ROUTER_PORT + nodeId}');
  });

  return server;
}