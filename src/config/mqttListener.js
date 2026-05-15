import createMQTTClient from "../config/mqtt.js";
import CareplantServices from "../services/CareplantServices.js";
import HistoryWaterpumpServices from "../services/HistoryWaterpumpServices.js";
import HistoryLineServices from "../services/HistoryLineServices.js"; 
import TemperatureHistoryServices from "../services/TemperatureHistoryServices.js";


let fanState = null;

export const startMQTTListener = () => {
  const client = createMQTTClient();

  client.on("connect", () => {
    client.subscribe("home/fant/state", (err) => {
      if (err) console.log(" Subscribe lỗi:", err);
      else console.log("📡 Đang nghe topic: home/fant/state");
    });
  });

  client.on("message", async (topic, message) => {
    if (topic !== "home/fant/state") return;

    try {
      const payload = JSON.parse(message.toString());

      console.log(" MQTT payload:", payload);

      const {
        IdStyemLocation,
        trangthaiMaybom,
        tocdoMaybom,
        trangthaiDen,
        cuongdoDen,
        cambienNhietdo,
        cambienDoam_Mat_Dat,
        cambienAnhSang,
      } = payload;

      if (!IdStyemLocation) {
        console.error(" MQTT thiếu IdStyemLocation");
        return;
      }

      const updateCareplantData = await CareplantServices.updateCareplant(
        IdStyemLocation, {
        trangthaiMaybom,
        tocdoMaybom,
        trangthaiDen,
        cuongdoDen,
        cambienNhietdo,
        cambienDoam_Mat_Dat,
        cambienAnhSang,
      });

      const createHistoryWaterpump = await HistoryWaterpumpServices.createHistoryWaterpump({
        IdStyemLocation,
        trangthaiMaybom,
        cambienDoam_Mat_Dat,
      });

      const createHistoryLine = await HistoryLineServices.createHistoryLine({
         IdStyemLocation,
        cambienAnhSang,
        trangthaiDen,
      });
      const createTemperatureHistory = await TemperatureHistoryServices.createTemperatureHistory({
         IdStyemLocation,
        cambienNhietdo,
      });




    
      fanState = payload;

      console.log(" Updated fanState:", fanState);

      console.log(` Fan ${IdStyemLocation} updated in DB`);
    } catch (error) {
      console.error(" MQTT message error:", error.message);
    }
  });

  return client;
};

export const getFanState = () => fanState;