// src/jobs/alertMonitorJob.js

import cron from "node-cron";
import alertMonitorService from "../services/alerMonitorService.js";

const startAlertMonitorJob = () => {

    cron.schedule(
        "*/30 * * * * *",
        async () => {

            console.log("Đang kiểm tra cảnh báo...");

            await alertMonitorService.checkCareplantData();

        }
    );

};

export default startAlertMonitorJob;