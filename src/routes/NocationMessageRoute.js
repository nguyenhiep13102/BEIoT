import express from 'express';
import NocationMessageController from '../controllers/NocationMessageController.js';

let routes = express.Router();

routes.post('/create', NocationMessageController.createNocationMessage);
routes.put('/update/:id', NocationMessageController.updateNocationMessage);
routes.delete('/delete/:id', NocationMessageController.deleteNocationMessage);
routes.post('/delete-many', NocationMessageController.deleteNocationMessageMany);
routes.get('/getAll', NocationMessageController.getAllNocationMessage);
routes.get('/getDetail/:id', NocationMessageController.getNocationMessageById);

export default routes;

