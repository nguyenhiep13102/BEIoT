import express from 'express';
import SysteamLocationController from '../controllers/SysteamLocationController.js';

let routes = express.Router();

routes.post('/create', SysteamLocationController.createSysteamLocation);
routes.put('/update/:id', SysteamLocationController.updateSysteamLocation);
routes.delete('/delete/:id', SysteamLocationController.deleteSysteamLocation);
routes.post('/delete-many', SysteamLocationController.deleteSysteamLocationMany);
routes.get('/getAll', SysteamLocationController.getAllSysteamLocation);
routes.get('/getDetail/:id', SysteamLocationController.getSysteamLocationById);
routes.get('/getDetailbyiduser/:id', SysteamLocationController.getSysteamLocationByIduser);

export default routes;

