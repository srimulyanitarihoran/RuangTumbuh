require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Server berhasil bertahan hidup!" });
});

// Jalankan Server dengan indikator waktu
const server = app.listen(PORT, () => {
  console.log(
    `[${new Date().toLocaleTimeString()}] Server RuangTumbuh berjalan di http://localhost:${PORT}`,
  );
});

// Penjaga Error
server.on("error", (err) => {
  console.error("❌ Express Error:", err.message);
});
