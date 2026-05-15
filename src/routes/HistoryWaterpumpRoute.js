import express from 'express';
import HistoryWaterpumpController from '../controllers/HistoryWaterpumpController.js';

let routes = express.Router();

routes.post('/create', HistoryWaterpumpController.createHistoryWaterpump);
routes.put('/update/:id', HistoryWaterpumpController.updateHistoryWaterpump);
routes.delete('/delete/:id', HistoryWaterpumpController.deleteHistoryWaterpump);
routes.post('/delete-many', HistoryWaterpumpController.deleteHistoryWaterpumpMany);
routes.get('/getAll', HistoryWaterpumpController.getAllHistoryWaterpump);
routes.get('/getDetail/:id', HistoryWaterpumpController.getHistoryWaterpumpById);

export default routes;

