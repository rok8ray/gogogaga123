const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");

const DATA_FILE = "./messages.json";

// Function to load saved messages
let messageHistory = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    messageHistory = JSON.parse(fs.readFileSync(DATA_FILE));
  } catch (err) {
    console.error("Error reading messages.json:", err);
    messageHistory = [];
  }
}

app.get("/", (req, res) => {
  let html = fs.readFileSync(__dirname + "/index.html", "utf8");
  html = html.replace(
    "{{FIREBASE_API_KEY}}",
    process.env.FIREBASE_API_KEY || "",
  );
  html = html.replace(
    "{{FIREBASE_AUTH_DOMAIN}}",
    process.env.FIREBASE_AUTH_DOMAIN || "",
  );
  html = html.replace(
    "{{FIREBASE_PROJECT_ID}}",
    process.env.FIREBASE_PROJECT_ID || "",
  );
  html = html.replace(
    "{{FIREBASE_STORAGE_BUCKET}}",
    process.env.FIREBASE_STORAGE_BUCKET || "",
  );
  html = html.replace(
    "{{FIREBASE_MESSAGING_SENDER_ID}}",
    process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  );
  html = html.replace("{{FIREBASE_APP_ID}}", process.env.FIREBASE_APP_ID || "");
  html = html.replace(
    "{{FIREBASE_MEASUREMENT_ID}}",
    process.env.FIREBASE_MEASUREMENT_ID || "",
  );
  res.set("Content-Type", "text/html");
  res.send(html);
});

io.on("connection", (socket) => {
  // When someone joins, send them the history immediately
  socket.emit("load history", messageHistory);

  socket.on("user joined", (username) => {
    socket.username = username;
    socket.broadcast.emit("announcement", `${username} joined the room`);
  });

  socket.on("chat message", (data) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessage = { user: data.user, text: data.text, time: time };

    // Save to memory
    messageHistory.push(newMessage);

    // Keep only the last 100 messages
    if (messageHistory.length > 100) messageHistory.shift();

    // Save to the file (Persistence)
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(messageHistory));
    } catch (err) {
      console.error("Error saving messages.json:", err);
    }

    io.emit("chat message", newMessage);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("announcement", `${socket.username} left the room`);
    }
  });
});

const PORT = 5000;
http.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
