import express from 'express';
import TemperatureHistoryController from '../controllers/TemperatureHistoryController.js';

let routes = express.Router();

routes.post('/create', TemperatureHistoryController.createTemperatureHistory);
routes.put('/update/:id', TemperatureHistoryController.updateTemperatureHistory);
routes.delete('/delete/:id', TemperatureHistoryController.deleteTemperatureHistory);
routes.post('/delete-many', TemperatureHistoryController.deleteTemperatureHistoryMany);
routes.get('/getAll', TemperatureHistoryController.getAllTemperatureHistory);
routes.get('/getDetail/:id', TemperatureHistoryController.getTemperatureHistoryById);
routes.get('/getDetail200/:id', TemperatureHistoryController.getHistoryLineById200);
export default routes;

