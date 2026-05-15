import express from 'express';
import CareplantController from '../controllers/CareplantController.js';

let routes = express.Router();

routes.post('/create', CareplantController.createCareplant);
routes.put('/update/:id', CareplantController.updateCareplant);
routes.delete('/delete/:id', CareplantController.deleteCareplant);
routes.post('/delete-many', CareplantController.deleteCareplantMany);
routes.get('/getAll', CareplantController.getAllCareplant);
routes.get('/getDetail/:id', CareplantController.getCareplantById);
routes.put('/controllerIoT/:id', CareplantController.controllerWaterpump);

export default routes;

