// smartFarmSimulator.js

import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

const SYSTEM_ID = "6a057f4ae5d0b8db8e4d1586";

const BROKER_URL =
  process.env.MQTT_BROKER || "mqtt://localhost:1883";

// ================= STATE =================
let systemState = {
  IdStyemLocation: SYSTEM_ID,

  // Máy bơm
  trangthaiMaybom: 0,
  tocdoMaybom: 0,

  // Đèn
  trangthaiDen: 0,
  cuongdoDen: 0,
};

// ================= MQTT =================
const client = mqtt.connect(BROKER_URL);

// ================= CONNECT =================
client.on("connect", () => {
  console.log("🤖 Smart Farm Simulator connected");

  client.subscribe("home/fant/command", () => {
    console.log("📡 Listening: home/fant/command");
  });

  publishState();
});

// ================= RECEIVE COMMAND =================
client.on("message", (topic, message) => {
  if (topic !== "home/fant/command") return;

  try {
    const cmd = JSON.parse(message.toString());

    console.log("⚡ Command received:", cmd);

    // Kiểm tra đúng thiết bị
    if (cmd.IdStyemLocation !== SYSTEM_ID) {
      return;
    }

    // ===== HANDLE PUMP =====
    if (cmd.trangthaiMaybom !== undefined) {
      systemState.trangthaiMaybom =
        cmd.trangthaiMaybom;
    }

    if (cmd.tocdoMaybom !== undefined) {
      systemState.tocdoMaybom =
        cmd.tocdoMaybom;
    }

    // ===== HANDLE LIGHT =====
    if (cmd.trangthaiDen !== undefined) {
      systemState.trangthaiDen =
        cmd.trangthaiDen;
    }

    if (cmd.cuongdoDen !== undefined) {
      systemState.cuongdoDen =
        cmd.cuongdoDen;
    }

    publishState();
  } catch (err) {
    console.error(
      "❌ Command parse error:",
      err.message
    );
  }
});

// ================= PUBLISH STATE =================
function publishState() {
  const payload = JSON.stringify(systemState);

  client.publish("home/fant/state", payload, () => {
    console.log("📤 State sent:", payload);
  });
}

// ================= ERROR =================
client.on("error", (err) => {
  console.error("❌ MQTT error:", err.message);
});