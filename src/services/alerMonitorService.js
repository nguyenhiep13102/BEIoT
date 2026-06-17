import Careplant from "../models/Careplant.js";
import NocationMessage from "../models/nocationmessege.js";
import NocationMessageServices from "./NocationMessageServices.js";
import ALERT_THRESHOLD from "../config/alertThreshold.js";
import sendFanCommand  from "../config/mqttController.js";
const checkCareplantData = async () => {

    const careplants =
        await Careplant.find();

    for (const item of careplants) {

        // nhiệt độ

        if (
            item.cambienNhietdo >
            ALERT_THRESHOLD.TEMPERATURE_MAX
        ) {

            if (item.chedoTuDong == 1) {
                const controllerData = {
                    IdStyemLocation: item.IdStyemLocation,
                    trangthaiMaybom: 1,
                    tocdoMaybom: 100,

                };
                sendFanCommand.sendFanCommand(controllerData);
            }

            await NocationMessageServices.createNotification(
                item,
                "HIGH_TEMPERATURE",
                "Cảnh báo nhiệt độ",
                `Nhiệt độ hiện tại ${item.cambienNhietdo}°C vượt ngưỡng ${ALERT_THRESHOLD.TEMPERATURE_MAX}°C`
            );
        }



        if (
            item.cambienDoam_Mat_Dat <
            ALERT_THRESHOLD.SOIL_HUMIDITY_MIN
        ) {


             if (item.chedoTuDong == 1) {
                const controllerData = {
                    IdStyemLocation: item.IdStyemLocation,
                    trangthaiMaybom: 1,
                    tocdoMaybom: 100,

                };
                sendFanCommand.sendFanCommand(controllerData);
            }

            await NocationMessageServices.createNotification(
                item,
                "LOW_SOIL_HUMIDITY",
                "Cảnh báo độ ẩm đất",
                `Độ ẩm đất hiện tại ${item.cambienDoam_Mat_Dat}% thấp hơn ngưỡng ${ALERT_THRESHOLD.SOIL_HUMIDITY_MIN}%`
            );
        }


         if (
            item.cambienAnhSang <
            ALERT_THRESHOLD.LIGHT_MIN
        ) {


             if (item.chedoTuDong == 1) {
                const controllerData = {
                    IdStyemLocation: item.IdStyemLocation,
                    trangthaiDen: 1,
                    cuongdoDen: 100
                };
                sendFanCommand.sendFanCommand(controllerData);
            }

            await NocationMessageServices.createNotification(
                item,
                "LOW_LIGHT",
                "Cảnh báo ánh sáng",
                `Ánh sáng hiện tại ${item.cambienAnhSang} thấp hơn ngưỡng ${ALERT_THRESHOLD.LIGHT_MIN}`
            );
        }

    }

};

export default {
    checkCareplantData
};