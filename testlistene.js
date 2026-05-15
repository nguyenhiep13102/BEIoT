// sendMQTT.js
import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("✅ Connected MQTT Broker");

  setInterval(() => {
    const data = {
      IdStyemLocation: "6a057f4ae5d0b8db8e4d1586",

      // Máy bơm
      trangthaiMaybom: Math.random() > 0.5 ? 1 : 0,
      tocdoMaybom: Math.floor(Math.random() * 100),

      // Đèn
      trangthaiDen: Math.random() > 0.5 ? 1 : 0,
      cuongdoDen: Math.floor(Math.random() * 100),

      // Cảm biến
      cambienNhietdo: (20 + Math.random() * 15),
      cambienDoam_Mat_Dat: (40 + Math.random() * 50),
      cambienAnhSang: Math.floor(Math.random() * 1000),
    };

    client.publish(
      "home/fant/state",
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.log("❌ Publish lỗi:", err);
        } else {
          console.log("📤 Đã gửi:", data);
        }
      }
    );
  }, 2000);
});

client.on("error", (err) => {
  console.log("MQTT Error:", err);
});