const express = require("express");
const app = express();
const helmet = require("helmet");
const config = require("./config");
const cors = require("cors");
const http = require("http").createServer(app);
const socketIoServer = require("http").createServer(); // Yeni bir HTTP sunucusu oluşturun
const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: "*", // İzin verilen kök URL
    methods: ["GET", "POST"], // İzin verilen HTTP metotları
    credentials: true, // Kimlik bilgisi (cookies) ile iletişime izin ver
  },
});

const socketEvents = require("./loaders/socketEvents"); // socketEvents.js dosyasını içe aktarın

const { UserRoutes, CategoryRoutes, ProductRoutes,  } = require("./api");

config();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Rest API Up!",
  });
});
socketEvents(io);

app.listen(process.env.APP_PORT, () => {
  console.log(process.env.APP_PORT, " portu üzerinden çalışıyor.");

  app.use("/users", UserRoutes);
  app.use("/categories", CategoryRoutes);
  app.use("/products", ProductRoutes);
});

// Socket.io sunucusunu farklı bir portta çalıştırın
const socketPort = 3002; // Örneğin, 3001 portunu kullanabilirsiniz
socketIoServer.listen(socketPort, () => {
  console.log(`Socket.io server is listening on port ${socketPort}`);
});
