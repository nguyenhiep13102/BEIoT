import createMQTTClient from "../config/mqtt.js";

let client;

 const initMQTTController = () => {
  client = createMQTTClient();

  client.on("connect", () => {
    console.log("✅ MQTT Controller connected");
  });
};


 const sendFanCommand = (data) => {
  if (!client) {
    console.error("❌ MQTT Controller chưa khởi tạo.");
    return;
  }



  const payload = JSON.stringify(data);
  console.log("🚀 Sending command:", payload);
  client.publish("home/fant/command", payload, (err) => {
    if (err) {
      console.error("❌ Publish error:", err);
    } else {
      console.log("🚀 Đã gửi lệnh :", payload);
    }
  });
};
export default {
   initMQTTController,
   sendFanCommand,
}