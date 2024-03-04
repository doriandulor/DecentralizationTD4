import express from "express";
import { BASE_USER_PORT } from "../config";

let lastReceivedMessage : string | null = null;
let lastSentMessage : string | null = null;

export async function user(userId: number) {
  const _user = express();
  _user.use(express.json());

  _user.get("/status", (req, res) => {
    res.send("live");
  });

  // Additional GET routes for user message info
  _user.get("/getLastReceivedMessage", (req, res) => {
    res.json({ result: lastReceivedMessage });
  });

  _user.get("/getLastSentMessage", (req, res) => {
    res.json({ result: lastSentMessage });
  });

  // Example routes for receiving/sending messages (update as needed)
  _user.post("/message", (req, res) => {
    // Logic for updating lastReceivedMessage
    // This is a simplified example. Update according to your application's logic
    res.sendStatus(200);
  });

  _user.post("/sendMessage", (req, res) => {
    const { message, destinationUserId } = req.body; // Simplified example
    // Logic for sending a message and updating lastSentMessage
    // Update according to your application's logic
    res.sendStatus(200);
  });

  const server = _user.listen(BASE_USER_PORT + userId, () => {
    console.log('User ${userId} is listening on port ${BASE_USER_PORT + userId}');
  });

  return server;
}