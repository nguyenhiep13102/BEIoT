import express from 'express';
import HistoryLineController from '../controllers/HistoryLineController.js';

let routes = express.Router();

routes.post('/create', HistoryLineController.createHistoryLine);
routes.put('/update/:id', HistoryLineController.updateHistoryLine);
routes.delete('/delete/:id', HistoryLineController.deleteHistoryLine);
routes.post('/delete-many', HistoryLineController.deleteHistoryLineMany);
routes.get('/getAll', HistoryLineController.getAllHistoryLine);
routes.get('/getDetail/:id', HistoryLineController.getHistoryLineById);
routes.get('/getDetail200/:id', HistoryLineController.getHistoryLineById200);

export default routes;

