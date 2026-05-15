import UserRoute from "../routes/UserRoute.js";
import CareplantRoute from "../routes/CareplantRoute.js";
import HistoryWaterpumpRoute from "../routes/HistoryWaterpumpRoute.js";
import NocationMessageRoute from "../routes/NocationMessageRoute.js";
import SysteamLocationRoute from "../routes/SysteamLocationRoute.js";
import HistoryLineRoute from "../routes/HistoryLineRoute.js";
import TemperatureHistoryRoute from "../routes/TemperatureHistoryRoute.js";


let routes = (app ) => {
    app.use('/api/user', UserRoute);
    app.use('/api/careplant', CareplantRoute);
    app.use('/api/historywaterpump', HistoryWaterpumpRoute);
    app.use('/api/nocationmessage', NocationMessageRoute);
    app.use('/api/systeamlocation', SysteamLocationRoute);
    app.use('/api/historyline', HistoryLineRoute);
    app.use('/api/temperaturehistory', TemperatureHistoryRoute);
     
};
export default routes ; 
