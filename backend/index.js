const io = require("socket.io-client");
const { processData } = require("./dataProcessor");
const connectDB = require("./db");
require("dotenv").config();
const dataRoutes = require("./dataRoute");
const express = require("express");
const cors = require("cors");

const SOCKET_URL = "https://gss.wscada.net";
const SOCKET_NAMESPACES = ["river_test"];
const PORT = process.env.PORT || 8300;

const startApp = async () => {
  try {
    const app = express();
    await connectDB();

    console.log("Database connected successfully.");

    app.use(
      cors({
        origin: "http://192.168.4.184:5173",
        // origin: "http://localhost:5173",
      })
    );
    app.use(dataRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    const socketConnections = SOCKET_NAMESPACES.map((namespace) => {
      const socket = io(SOCKET_URL);

      socket.on("connect", () => {
        console.log(
          `Connected to WebSocket server. Requesting namespace: ${namespace}`
        );
        socket.emit("client_request", namespace);
      });

      socket.on(namespace, (data) => {
        const filteredData = data.filter((item) =>
          [451, 452].includes(item.id)
        );
        processData(filteredData);
      });

      socket.on("connect_error", (error) => {
        console.error(
          `Connection error for namespace ${namespace}:`,
          error.message
        );
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected from namespace: ${namespace}`);
      });

      return socket;
    });

    module.exports = socketConnections;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startApp();
