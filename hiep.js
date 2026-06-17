// smartFarmSimulator.js

import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

const SYSTEM_ID = "6a057f4ae5d0b8db8e4d1586";
const BROKER_URL = process.env.MQTT_BROKER || "mqtt://localhost:1883";

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

// Lưu lại cấu hình trước đó để khi bật lại thiết bị sẽ phục hồi mức cũ
let lastPumpSpeed = 50;  // Mặc định chạy 50% nếu bật lên mà không truyền tốc độ
let lastLightIntensity = 100; // Mặc định sáng 100% khi bật đèn

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

    // KIỂM TRA ID: Chỉ từ chối nếu truyền SAI ID. Nếu không truyền ID thì vẫn xử lý.
    if (cmd.IdStyemLocation && cmd.IdStyemLocation !== SYSTEM_ID) {
      console.log("⚠️ Lệnh dành cho thiết bị khác. Bỏ qua.");
      return;
    }

    let hasChange = false;

    // ===== XỬ LÝ MÁY BƠM =====
    if (cmd.trangthaiMaybom !== undefined) {
      systemState.trangthaiMaybom = cmd.trangthaiMaybom;
      hasChange = true;

      if (systemState.trangthaiMaybom === 0) {
        // Nếu tắt bơm -> Tốc độ về 0
        systemState.tocdoMaybom = 0;
      } else if (systemState.trangthaiMaybom === 1 && systemState.tocdoMaybom === 0) {
        // Nếu bật bơm mà tốc độ đang là 0 -> Khôi phục lại tốc độ trước đó
        systemState.tocdoMaybom = lastPumpSpeed;
      }
    }

    if (cmd.tocdoMaybom !== undefined) {
      const speed = Number(cmd.tocdoMaybom);
      systemState.tocdoMaybom = speed;
      hasChange = true;

      if (speed > 0) {
        systemState.trangthaiMaybom = 1; // Có tốc độ => Tự động Bật bơm
        lastPumpSpeed = speed;           // Lưu lại lịch sử tốc độ
      } else {
        systemState.trangthaiMaybom = 0; // Tốc độ = 0 => Tự động Tắt bơm
      }
    }

    // ===== XỬ LÝ ĐÈN =====
    if (cmd.trangthaiDen !== undefined) {
      systemState.trangthaiDen = cmd.trangthaiDen;
      hasChange = true;

      if (systemState.trangthaiDen === 0) {
        // Nếu tắt đèn -> Cường độ về 0
        systemState.cuongdoDen = 0;
      } else if (systemState.trangthaiDen === 1 && systemState.cuongdoDen === 0) {
        // Nếu bật đèn mà cường độ là 0 -> Khôi phục độ sáng trước đó
        systemState.cuongdoDen = lastLightIntensity;
      }
    }

    if (cmd.cuongdoDen !== undefined) {
      const intensity = Number(cmd.cuongdoDen);
      systemState.cuongdoDen = intensity;
      hasChange = true;

      if (intensity > 0) {
        systemState.trangthaiDen = 1;      // Có độ sáng => Tự động Bật đèn
        lastLightIntensity = intensity;   // Lưu lại lịch sử độ sáng
      } else {
        systemState.trangthaiDen = 0;      // Độ sáng = 0 => Tự động Tắt đèn
      }
    }

    // Chỉ gửi phản hồi lên server nếu có sự thay đổi trạng thái
    if (hasChange) {
      publishState();
    }

  } catch (err) {
    console.error("❌ Command parse error:", err.message);
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